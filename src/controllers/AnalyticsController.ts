import type { Request, Response } from "express";
import { AnalyticsService } from "../services/AnalyticsService";

export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  track = async (request: Request, response: Response): Promise<void> => {
    const event = await this.analyticsService.trackEvent({
      userId: request.user?.id,
      eventName: request.body.eventName,
      properties: request.body.properties
    });

    response.status(202).json({ event });
  };
}
