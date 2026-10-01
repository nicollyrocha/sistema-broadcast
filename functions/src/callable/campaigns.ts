import { onCall } from "firebase-functions/v2/https";

export const createCampaign = onCall(async (_request) => {
  // TODO: validar payload, checar workspace, salvar rascunho
  return { ok: true };
});

export const sendCampaign = onCall(async (_request) => {
  // TODO: enfileirar envio
  return { ok: true };
});

export const cancelCampaign = onCall(async (_request) => {
  // TODO
  return { ok: true };
});
