import type { NotificationDocument } from "../models/Notification";
import { NotificationRepository } from "../repositories/NotificationRepository";

export interface CreateNotificationCommand {
  userId: string;
  type: string;
  title: string;
  message: string;
}

export class NotificationService {
  constructor(private readonly notificationRepository: NotificationRepository) {}

  async createNotification(command: CreateNotificationCommand): Promise<NotificationDocument> {
    // Queue-ready boundary: dispatch, fanout, push notification, or email side effects can move here later.
    return this.notificationRepository.create(command);
  }

  async listForUser(userId: string): Promise<NotificationDocument[]> {
    return this.notificationRepository.listForUser(userId);
  }
}
