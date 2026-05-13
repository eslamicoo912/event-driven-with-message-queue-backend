import type { Request, Response } from "express";
import { AppError } from "../utils/AppError";
import { ImageService } from "../services/ImageService";

export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  upload = async (request: Request, response: Response): Promise<void> => {
    if (!request.user) {
      throw new AppError("Authenticated user missing from request", 401);
    }

    if (!request.file) {
      throw new AppError("Image file is required", 400);
    }

    const image = await this.imageService.uploadImage({
      userId: request.user.id,
      originalName: request.file.originalname,
      mimeType: request.file.mimetype,
      size: request.file.size,
      path: request.file.path
    });

    response.status(201).json({ image });
  };
}
