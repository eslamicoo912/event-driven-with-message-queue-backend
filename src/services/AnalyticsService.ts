import type { AnalyticsEventDocument } from "../models/AnalyticsEvent";
import { AnalyticsRepository } from "../repositories/AnalyticsRepository";

export interface TrackEventCommand {
  userId?: string;
  eventName: string;
  properties?: Record<string, unknown>;
  source?: string;
}

export class AnalyticsService {
  constructor(private readonly analyticsRepository: AnalyticsRepository) {}

  async trackEvent(command: TrackEventCommand): Promise<AnalyticsEventDocument> {
    // Queue-ready boundary: high-volume event writes are ideal candidates for async queue ingestion.
    return this.analyticsRepository.create({
      ...command,
      source: command.source ?? "api"
    });
  }
}
