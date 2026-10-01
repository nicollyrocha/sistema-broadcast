/**
 * Escritas: todas passam pelas Cloud Functions (callables em functions/src).
 * Leituras em tempo real ficam em ./realtime.ts.
 */
import { httpsCallable } from "firebase/functions";
import { functions } from "@/lib/firebase";

function callable<Req, Res = { id: string }>(name: string) {
  const fn = httpsCallable<Req, Res>(functions, name);
  return async (data: Req) => (await fn(data)).data;
}

// Cliente (users/{uid}) — chamado no cadastro e no login com Google
export const saveClient = callable<{ name?: string }>("saveClient");

// Conexões
export const createConnection = callable<{ name: string }>("createConnection");
export const updateConnection = callable<{ id: string; name: string }>("updateConnection");
/** Também apaga os contatos e mensagens da conexão. */
export const deleteConnection = callable<{ id: string }>("deleteConnection");

// Contatos
export const createContact = callable<{ connectionId: string; name: string; phone: string }>("createContact");
export const updateContact = callable<{ connectionId: string; id: string; name: string; phone: string }>(
  "updateContact",
);
export const deleteContact = callable<{ connectionId: string; id: string }>("deleteContact");

// Mensagens
export interface MessageInput {
  connectionId: string;
  content: string;
  contactIds: string[];
  /** ISO. Omitir (ou data passada) = enviar agora. */
  scheduledAt?: string;
}

/** Envia agora (sem scheduledAt) ou agenda (scheduledAt futuro). Fica gravada em .../messages. */
export const sendMessage = callable<MessageInput>("sendMessage");
/** Só para mensagens ainda agendadas. Sem scheduledAt = envia na hora. */
export const updateMessage = callable<MessageInput & { id: string }>("updateMessage");
export const deleteMessage = callable<{ connectionId: string; id: string }>("deleteMessage");

/** Converte o erro da callable (HttpsError) em texto para a UI. */
export function apiErrorMessage(error: unknown): string {
  const message = (error as { message?: string })?.message;
  return message && message !== "internal" ? message : "Não foi possível concluir. Tente novamente.";
}
