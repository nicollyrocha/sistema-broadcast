import { HttpsError, type CallableRequest } from "firebase-functions/v2/https";
import { db } from "./firebase";

/** Garante que a chamada vem de um usuário logado e devolve o uid (= id do cliente). */
export function requireUid(request: CallableRequest): string {
  const uid = request.auth?.uid;
  if (!uid) throw new HttpsError("unauthenticated", "Faça login para continuar.");
  return uid;
}

export function requireString(value: unknown, field: string, max = 200): string {
  if (typeof value !== "string" || !value.trim()) {
    throw new HttpsError("invalid-argument", `O campo "${field}" é obrigatório.`);
  }
  const trimmed = value.trim();
  if (trimmed.length > max) {
    throw new HttpsError("invalid-argument", `O campo "${field}" aceita no máximo ${max} caracteres.`);
  }
  return trimmed;
}

/** Mantém só os dígitos; aceita de 10 a 13 dígitos (ex.: 11999998888 ou 5511999998888). */
export function requirePhone(value: unknown): string {
  const digits = requireString(value, "phone", 30).replace(/\D/g, "");
  if (digits.length < 10 || digits.length > 13) {
    throw new HttpsError("invalid-argument", "Telefone inválido.");
  }
  return digits;
}

/**
 * Isolamento entre clientes: busca um documento e só devolve se ele for do cliente (clientId).
 * Documento de outro cliente responde "not-found", como se não existisse.
 */
export async function getOwnedDoc(collection: string, id: unknown, uid: string) {
  const snap = await db.collection(collection).doc(requireString(id, "id")).get();
  if (!snap.exists || snap.get("clientId") !== uid) {
    throw new HttpsError("not-found", "Registro não encontrado.");
  }
  return snap;
}

/** Apaga, em lotes de 500, todos os docs da coleção que pertencem à conexão. */
export async function deleteByConnection(collection: string, connectionId: string, uid: string) {
  const snap = await db
    .collection(collection)
    .where("clientId", "==", uid)
    .where("connectionId", "==", connectionId)
    .get();
  for (let i = 0; i < snap.docs.length; i += 500) {
    const batch = db.batch();
    snap.docs.slice(i, i + 500).forEach((doc) => batch.delete(doc.ref));
    await batch.commit();
  }
}
