import { onRequest } from "firebase-functions/v2/https";

export const whatsappWebhook = onRequest(async (_req, res) => {
  // TODO: verificar assinatura e atualizar status de entrega/leitura
  res.sendStatus(200);
});
