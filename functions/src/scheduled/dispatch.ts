import { onSchedule } from "firebase-functions/v2/scheduler";

export const dispatchScheduledCampaigns = onSchedule("every 1 minutes", async () => {
  // TODO: buscar campanhas agendadas vencidas e disparar
});
