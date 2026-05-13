import { ImageRepository } from "../repositories/ImageRepository";

export interface ProcessImageCommand {
  imageId: string;
  path: string;
  mimeType: string;
}

export class FileProcessingService {
  constructor(private readonly imageRepository: ImageRepository) {}

  async processUploadedImage(command: ProcessImageCommand): Promise<void> {
    // Queue-ready boundary: resizing, scanning, metadata extraction, and thumbnailing can become a worker job.
    // This synchronous placeholder only records that the file reached the processing stage successfully.
    console.info("Processing uploaded image", {
      imageId: command.imageId,
      path: command.path,
      mimeType: command.mimeType
    });

    await this.imageRepository.updateProcessingStatus(command.imageId, "processed");
  }
}
