import { onRequest } from "firebase-functions/v2/https";

export const stripeWebhook = onRequest(async (_req, res) => {
  // TODO: tratar eventos de assinatura
  res.sendStatus(200);
});
