import type { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/AppError";
import { verifyAuthToken } from "../utils/jwt";

export function requireAuth(request: Request, _response: Response, next: NextFunction): void {
  const header = request.headers.authorization;
  const token = header?.startsWith("Bearer ") ? header.slice("Bearer ".length) : null;

  if (!token) {
    next(new AppError("Authentication token is required", 401));
    return;
  }

  try {
    request.user = verifyAuthToken(token);
    next();
  } catch {
    next(new AppError("Invalid or expired authentication token", 401));
  }
}
