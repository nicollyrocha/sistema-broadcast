import { onCall } from "firebase-functions/v2/https";

export const importContacts = onCall(async (_request) => {
  // TODO: processar CSV do Storage e gravar contatos em lote
  return { ok: true };
});
