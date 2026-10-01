/**
 * Leituras em tempo real (onSnapshot). As escritas passam pelas Cloud Functions (./api.ts).
 *
 * Toda query filtra por clientId == uid: as regras do Firestore só liberam leitura
 * de documentos do próprio cliente, então uma query sem esse filtro é recusada.
 */
import {
  Timestamp,
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
  type DocumentData,
  type Query,
} from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import type { Connection, Contact, Message } from "@/types";

export type Unsubscribe = () => void;
export type OnError = (error: Error) => void;

const toIso = (value: unknown): string | undefined =>
  value instanceof Timestamp ? value.toDate().toISOString() : undefined;

/** Filtro de isolamento: só documentos do cliente logado. */
function ownedBy() {
  const uid = auth.currentUser?.uid;
  if (!uid) throw new Error("Faça login para continuar.");
  return where("clientId", "==", uid);
}

function listen<T>(
  q: Query<DocumentData>,
  map: (id: string, data: DocumentData) => T,
  onChange: (items: T[]) => void,
  onError?: OnError,
): Unsubscribe {
  return onSnapshot(
    q,
    (snap) => onChange(snap.docs.map((doc) => map(doc.id, doc.data()))),
    (error) => (onError ? onError(error) : console.error(error)),
  );
}

export function subscribeConnections(onChange: (items: Connection[]) => void, onError?: OnError) {
  return listen(
    query(collection(db, "connections"), ownedBy(), orderBy("createdAt", "desc")),
    (id, data) => ({
      id,
      name: data.name,
      createdAt: toIso(data.createdAt) ?? "",
      updatedAt: toIso(data.updatedAt),
    }),
    onChange,
    onError,
  );
}

export function subscribeContacts(connectionId: string, onChange: (items: Contact[]) => void, onError?: OnError) {
  return listen(
    query(collection(db, "contacts"), ownedBy(), where("connectionId", "==", connectionId), orderBy("name")),
    (id, data) => ({
      id,
      name: data.name,
      phone: data.phone,
      createdAt: toIso(data.createdAt) ?? "",
      updatedAt: toIso(data.updatedAt),
    }),
    onChange,
    onError,
  );
}

/**
 * Mensagens da conexão, mais recentes primeiro. Quando o processScheduledMessages
 * muda uma agendada para "sent", o listener recebe a mudança sozinho.
 */
export function subscribeMessages(connectionId: string, onChange: (items: Message[]) => void, onError?: OnError) {
  return listen(
    query(collection(db, "messages"), ownedBy(), where("connectionId", "==", connectionId), orderBy("createdAt", "desc")),
    (id, data) => ({
      id,
      content: data.content,
      contactIds: data.contactIds ?? [],
      status: data.status,
      scheduledAt: toIso(data.scheduledAt),
      sentAt: toIso(data.sentAt),
      createdAt: toIso(data.createdAt) ?? "",
    }),
    onChange,
    onError,
  );
}
