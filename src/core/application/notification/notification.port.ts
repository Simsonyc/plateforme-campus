export enum NotificationChannel {
  IN_APP = 'in_app',
  EMAIL = 'email',
  SMS = 'sms',
}

export interface NotificationPayload {
  userId: string;
  campusId?: string;
  channel: NotificationChannel;
  title: string;
  message: string;
  type: string;
}

export interface NotificationPort {
  send(payload: NotificationPayload): Promise<void>;
  sendBulk(payloads: NotificationPayload[]): Promise<void>;
}