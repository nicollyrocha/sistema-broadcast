export type MessageStatus = "sent" | "scheduled";

export interface Connection {
  id: string;
  name: string;
  createdAt: string;
  updatedAt?: string;
}

export interface Message {
  id: string;
  content: string;
  contactIds: string[];
  status: MessageStatus;
  /** ISO — preenchido quando agendada */
  scheduledAt?: string;
  /** ISO — preenchido quando enviada */
  sentAt?: string;
  createdAt: string;
}

export interface Contact {
  id: string;
  connectionId: string;
  name: string;
  /** Só dígitos, ex.: 5511999998888 */
  phone: string;
  createdAt: string;
  updatedAt?: string;
}
