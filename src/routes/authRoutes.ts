import { Router } from "express";
import { container } from "../container";
import { asyncHandler } from "../utils/asyncHandler";
import { validateRequest } from "../middlewares/validateRequest";
import { loginSchema, registerSchema } from "../validation/authSchemas";

export const authRoutes = Router();

authRoutes.post(
  "/register",
  validateRequest(registerSchema),
  asyncHandler(container.controllers.authController.register)
);

authRoutes.post(
  "/login",
  validateRequest(loginSchema),
  asyncHandler(container.controllers.authController.login)
);
