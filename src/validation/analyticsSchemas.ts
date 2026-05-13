import { z } from "zod";

export const trackEventSchema = z.object({
  body: z.object({
    eventName: z.string().min(1).max(120),
    properties: z.record(z.unknown()).optional()
  })
});
