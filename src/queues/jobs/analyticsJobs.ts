export const ANALYTICS_JOBS_NAMES = {
    TRACK_ANALYTICS: "track-analytics"
}

export interface TrackAnalyticsJobData {
    userId: string;
    eventName: string;
    properties?: Record<string, unknown>
}