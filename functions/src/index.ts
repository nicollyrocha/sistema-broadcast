import { onCall } from "firebase-functions/v2/https";
import { FieldValue } from "firebase-admin/firestore";
import { db } from "./firebase";
import { deleteByConnection, getOwnedDoc, requirePhone, requireString, requireUid } from "./lib";

/*
 * Modelagem (sem subcoleções). Cada usuário do Auth é um cliente (tenant):
 *   clients/{uid}        { name, email, createdAt, updatedAt }
 *   connections/{id}     { clientId, name, createdAt, updatedAt }
 *   contacts/{id}        { clientId, connectionId, name, phone, createdAt, updatedAt }
 *   messages/{id}        { clientId, connectionId, contactIds, content, status, ... }  (messageScheduler.ts)
 *
 * Isolamento: todo documento guarda o clientId do dono.
 *   - Escritas só acontecem aqui; o clientId sempre vem do token (request.auth.uid), nunca do front.
 *   - Leituras no front (onSnapshot) filtram por clientId e as regras do Firestore exigem esse filtro.
 */

// ───────────── Clientes ─────────────

/** Cria/atualiza o cliente do usuário logado. O front chama após o cadastro e o login com Google. */
export const saveClient = onCall(async (request) => {
  const uid = requireUid(request);
  const ref = db.doc(`clients/${uid}`);
  const exists = (await ref.get()).exists;

  // Nome: o enviado pelo front (cadastro) ou, para cliente novo, o do token (ex.: conta Google).
  const name = request.data?.name
    ? requireString(request.data.name, "name")
    : exists
      ? undefined
      : request.auth!.token.name ?? "";

  await ref.set(
    {
      ...(name !== undefined && { name }),
      email: request.auth!.token.email ?? "",
      ...(exists ? {} : { createdAt: FieldValue.serverTimestamp() }),
      updatedAt: FieldValue.serverTimestamp(),
    },
    { merge: true },
  );
  return { id: uid };
});

// ───────────── Conexões ─────────────

export const createConnection = onCall(async (request) => {
  const uid = requireUid(request);
  const ref = await db.collection("connections").add({
    clientId: uid,
    name: requireString(request.data?.name, "name"),
    createdAt: FieldValue.serverTimestamp(),
    updatedAt: FieldValue.serverTimestamp(),
  });
  return { id: ref.id };
});

export const updateConnection = onCall(async (request) => {
  const uid = requireUid(request);
  const snap = await getOwnedDoc("connections", request.data?.id, uid);
  await snap.ref.update({
    name: requireString(request.data?.name, "name"),
    updatedAt: FieldValue.serverTimestamp(),
  });
  return { id: snap.id };
});

/** Exclui a conexão junto com seus contatos e mensagens. */
export const deleteConnection = onCall(async (request) => {
  const uid = requireUid(request);
  const snap = await getOwnedDoc("connections", request.data?.id, uid);
  await deleteByConnection("contacts", snap.id, uid);
  await deleteByConnection("messages", snap.id, uid);
  await snap.ref.delete();
  return { id: snap.id };
});

// ───────────── Contatos ─────────────

export const createContact = onCall(async (request) => {
  const uid = requireUid(request);
  const connection = await getOwnedDoc("connections", request.data?.connectionId, uid);
  const ref = await db.collection("contacts").add({
    clientId: uid,
    connectionId: connection.id,
    name: requireString(request.data?.name, "name"),
    phone: requirePhone(request.data?.phone),
    createdAt: FieldValue.serverTimestamp(),
    updatedAt: FieldValue.serverTimestamp(),
  });
  return { id: ref.id };
});

export const updateContact = onCall(async (request) => {
  const uid = requireUid(request);
  const snap = await getOwnedDoc("contacts", request.data?.id, uid);
  await snap.ref.update({
    name: requireString(request.data?.name, "name"),
    phone: requirePhone(request.data?.phone),
    updatedAt: FieldValue.serverTimestamp(),
  });
  return { id: snap.id };
});

export const deleteContact = onCall(async (request) => {
  const uid = requireUid(request);
  const snap = await getOwnedDoc("contacts", request.data?.id, uid);
  await snap.ref.delete();
  return { id: snap.id };
});

// ───────────── Mensagens ─────────────

export * from "./messageScheduler";
