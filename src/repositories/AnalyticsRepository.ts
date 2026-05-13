import { AnalyticsEventModel, type AnalyticsEventDocument } from "../models/AnalyticsEvent";

export interface CreateAnalyticsEventInput {
  userId?: string;
  eventName: string;
  properties?: Record<string, unknown>;
  source?: string;
}

export class AnalyticsRepository {
  async create(input: CreateAnalyticsEventInput): Promise<AnalyticsEventDocument> {
    return AnalyticsEventModel.create(input);
  }
}
