export type Channel = "whatsapp" | "email" | "sms";
export type CampaignStatus = "draft" | "scheduled" | "sending" | "sent" | "paused" | "failed";

export interface Campaign {
  id: string;
  name: string;
  channel: Channel;
  status: CampaignStatus;
  audience: string;
  recipients: number;
  delivered: number;
  opened: number;
  clicked: number;
  date: string;
}

export interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
  tags: string[];
  status: "subscribed" | "unsubscribed" | "bounced";
  createdAt: string;
}
