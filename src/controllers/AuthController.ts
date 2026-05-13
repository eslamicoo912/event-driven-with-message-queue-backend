import type { Request, Response } from "express";
import { AuthService } from "../services/AuthService";

export class AuthController {
  constructor(private readonly authService: AuthService) {}

  register = async (request: Request, response: Response): Promise<void> => {
    // Controllers translate HTTP input/output only; registration flow lives in AuthService.
    const result = await this.authService.register(request.body);
    response.status(201).json(result);
  };

  login = async (request: Request, response: Response): Promise<void> => {
    const result = await this.authService.login(request.body);
    response.status(200).json(result);
  };
}
