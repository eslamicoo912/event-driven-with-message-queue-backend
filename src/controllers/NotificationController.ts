import type { Request, Response } from "express";
import { AppError } from "../utils/AppError";
import { NotificationService } from "../services/NotificationService";

export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  listMine = async (request: Request, response: Response): Promise<void> => {
    if (!request.user) {
      throw new AppError("Authenticated user missing from request", 401);
    }

    const notifications = await this.notificationService.listForUser(request.user.id);
    response.status(200).json({ notifications });
  };
}
