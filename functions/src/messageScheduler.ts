import { onCall, HttpsError } from "firebase-functions/v2/https";
import { onSchedule } from "firebase-functions/v2/scheduler";
import { FieldValue, Timestamp } from "firebase-admin/firestore";
import { db } from "./firebase";
import { getOwnedDoc, requireString, requireUid } from "./lib";

/*
 * messages/{id}
 *   { clientId, connectionId, contactIds, content, status, scheduledAt, sentAt, createdAt }
 *
 * O envio é só uma simulação: "enviar" = gravar a mensagem com status "sent".
 *   - sem data (ou data passada) → status "sent"      (enviada na hora)
 *   - data futura                → status "scheduled" (o processScheduledMessages envia depois)
 */

/** Decide o status pela data: futura = agendada, senão = enviada agora. */
function statusFor(scheduledAt?: string) {
  const date = scheduledAt ? new Date(scheduledAt) : null;
  if (date && date > new Date()) {
    return { status: "scheduled", scheduledAt: Timestamp.fromDate(date), sentAt: null };
  }
  return { status: "sent", scheduledAt: null, sentAt: FieldValue.serverTimestamp() };
}

/** Confere que os contatos existem, são do cliente e da mesma conexão. */
async function requireContactIds(value: unknown, connectionId: string, uid: string): Promise<string[]> {
  if (!Array.isArray(value) || value.length === 0) {
    throw new HttpsError("invalid-argument", "Selecione ao menos um contato.");
  }
  const ids = [...new Set(value.map((id) => requireString(id, "contactIds")))];
  const snaps = await db.getAll(...ids.map((id) => db.doc(`contacts/${id}`)));
  const valid = snaps.every((s) => s.exists && s.get("clientId") === uid && s.get("connectionId") === connectionId);
  if (!valid) throw new HttpsError("invalid-argument", "Algum contato selecionado não pertence a esta conexão.");
  return ids;
}

/** Envia (ou agenda) uma mensagem para contatos de uma conexão. */
export const sendMessage = onCall(async (request) => {
  const uid = requireUid(request);
  const { connectionId, content, contactIds, scheduledAt } = request.data ?? {};
  const connection = await getOwnedDoc("connections", connectionId, uid);

  const ref = await db.collection("messages").add({
    clientId: uid,
    connectionId: connection.id,
    contactIds: await requireContactIds(contactIds, connection.id, uid),
    content: requireString(content, "content", 1000),
    ...statusFor(scheduledAt),
    createdAt: FieldValue.serverTimestamp(),
  });
  return { id: ref.id };
});

/** Edita uma mensagem agendada (texto, contatos e data). */
export const updateMessage = onCall(async (request) => {
  const uid = requireUid(request);
  const { id, content, contactIds, scheduledAt } = request.data ?? {};
  const snap = await getOwnedDoc("messages", id, uid);
  if (snap.get("status") !== "scheduled") {
    throw new HttpsError("failed-precondition", "Só mensagens agendadas podem ser editadas.");
  }

  await snap.ref.update({
    contactIds: await requireContactIds(contactIds, snap.get("connectionId"), uid),
    content: requireString(content, "content", 1000),
    ...statusFor(scheduledAt),
  });
  return { id: snap.id };
});

/** Exclui uma mensagem (agendada ou enviada). */
export const deleteMessage = onCall(async (request) => {
  const uid = requireUid(request);
  const snap = await getOwnedDoc("messages", request.data?.id, uid);
  await snap.ref.delete();
  return { id: snap.id };
});

/** A cada minuto: toda mensagem agendada cujo horário já chegou passa para "sent". */
export const processScheduledMessages = onSchedule("every 1 minutes", async () => {
  const due = await db
    .collection("messages")
    .where("status", "==", "scheduled")
    .where("scheduledAt", "<=", Timestamp.now())
    .limit(500) // limite de um batch do Firestore; o restante vai no próximo minuto
    .get();

  const batch = db.batch();
  due.docs.forEach((doc) => batch.update(doc.ref, { status: "sent", sentAt: FieldValue.serverTimestamp() }));
  await batch.commit();
});
