import { Router } from "express";
import { container } from "../container";
import { requireAuth } from "../middlewares/authMiddleware";
import { validateRequest } from "../middlewares/validateRequest";
import { asyncHandler } from "../utils/asyncHandler";
import { trackEventSchema } from "../validation/analyticsSchemas";

export const analyticsRoutes = Router();

analyticsRoutes.post(
  "/events",
  requireAuth,
  validateRequest(trackEventSchema),
  asyncHandler(container.controllers.analyticsController.track)
);
