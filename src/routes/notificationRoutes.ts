import { Router } from "express";
import { container } from "../container";
import { requireAuth } from "../middlewares/authMiddleware";
import { asyncHandler } from "../utils/asyncHandler";

export const notificationRoutes = Router();

notificationRoutes.get(
  "/",
  requireAuth,
  asyncHandler(container.controllers.notificationController.listMine)
);
