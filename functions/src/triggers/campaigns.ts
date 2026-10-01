import { onDocumentWritten } from "firebase-functions/v2/firestore";

export const onCampaignWrite = onDocumentWritten(
  "workspaces/{workspaceId}/campaigns/{campaignId}",
  async (_event) => {
    // TODO: atualizar métricas agregadas
  },
);
