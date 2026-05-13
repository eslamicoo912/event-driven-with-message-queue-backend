import { Router } from "express";
import { analyticsRoutes } from "./analyticsRoutes";
import { authRoutes } from "./authRoutes";
import { imageRoutes } from "./imageRoutes";
import { notificationRoutes } from "./notificationRoutes";

export const apiRoutes = Router();

apiRoutes.use("/auth", authRoutes);
apiRoutes.use("/images", imageRoutes);
apiRoutes.use("/notifications", notificationRoutes);
apiRoutes.use("/analytics", analyticsRoutes);
