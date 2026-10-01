export type Channel = "whatsapp" | "email" | "sms";
export type CampaignStatus = "draft" | "scheduled" | "sending" | "sent" | "paused" | "failed";

export interface Campaign {
  id: string;
  workspaceId: string;
  name: string;
  channel: Channel;
  status: CampaignStatus;
  templateId: string;
  audienceIds: string[];
  scheduledAt?: string;
  createdAt: string;
}
