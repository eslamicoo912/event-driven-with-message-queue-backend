import { Router } from "express";
import { imageUpload } from "../config/multer";
import { container } from "../container";
import { requireAuth } from "../middlewares/authMiddleware";
import { asyncHandler } from "../utils/asyncHandler";

export const imageRoutes = Router();

imageRoutes.post(
  "/",
  requireAuth,
  imageUpload.single("image"),
  asyncHandler(container.controllers.imageController.upload)
);
