import { NotificationModel, type NotificationDocument } from "../models/Notification";

export interface CreateNotificationInput {
  userId: string;
  type: string;
  title: string;
  message: string;
}

export class NotificationRepository {
  async create(input: CreateNotificationInput): Promise<NotificationDocument> {
    return NotificationModel.create(input);
  }

  async listForUser(userId: string): Promise<NotificationDocument[]> {
    return NotificationModel.find({ userId }).sort({ createdAt: -1 }).exec();
  }
}
