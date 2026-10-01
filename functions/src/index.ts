/**
 * Entrypoint das Cloud Functions.
 * Cada função é exportada a partir do seu módulo de domínio.
 */
import "./lib/admin.js";

// Callable (chamadas autenticadas a partir do /web)
export { createCampaign, sendCampaign, cancelCampaign } from "./callable/campaigns.js";
export { importContacts } from "./callable/contacts.js";
export { inviteMember } from "./callable/workspace.js";

// HTTP (webhooks de provedores)
export { whatsappWebhook } from "./http/whatsappWebhook.js";
export { stripeWebhook } from "./http/stripeWebhook.js";

// Triggers
export { onUserCreated } from "./triggers/auth.js";
export { onCampaignWrite } from "./triggers/campaigns.js";

// Agendadas
export { dispatchScheduledCampaigns } from "./scheduled/dispatch.js";
