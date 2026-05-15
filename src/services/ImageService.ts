import type { ImageAssetDocument } from "../models/ImageAsset";
import { NotificationQueueProducer } from "../queues/producers/NotificationQueueProducer";
import { ImageRepository } from "../repositories/ImageRepository";
import { AnalyticsService } from "./AnalyticsService";
import { FileProcessingService } from "./FileProcessingService";

export interface UploadImageCommand {
  userId: string;
  originalName: string;
  mimeType: string;
  size: number;
  path: string;
}

export class ImageService {
  constructor(
    private readonly imageRepository: ImageRepository,
    private readonly fileProcessingService: FileProcessingService,
    private readonly notificationProducer: NotificationQueueProducer,
    private readonly analyticsService: AnalyticsService
  ) { }

  async uploadImage(command: UploadImageCommand): Promise<ImageAssetDocument> {
    const image = await this.imageRepository.create({
      ownerId: command.userId,
      originalName: command.originalName,
      mimeType: command.mimeType,
      size: command.size,
      path: command.path
    });

    // Queue-ready boundaries: each call below can later become an enqueue operation.
    await this.fileProcessingService.processUploadedImage({
      imageId: image._id.toString(),
      path: command.path,
      mimeType: command.mimeType
    });

    await this.notificationProducer.enqueueNotification({
      userId: command.userId,
      type: "image_uploaded",
      title: "Image uploaded",
      message: "Your image was uploaded and is ready for processing."
    });

    await this.analyticsService.trackEvent({
      userId: command.userId,
      eventName: "image_uploaded",
      properties: {
        imageId: image._id.toString(),
        mimeType: command.mimeType,
        size: command.size
      }
    });

    return image;
  }
}
