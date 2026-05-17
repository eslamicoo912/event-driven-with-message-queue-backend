import type { ImageAssetDocument } from "../models/ImageAsset";
import { AnalyticsQueueProducer } from "../queues/producers/AnalyticsQueueProducer";
import { FileProcessingQueueProducer } from "../queues/producers/FileProcessingQueueProducer";
import { NotificationQueueProducer } from "../queues/producers/NotificationQueueProducer";
import { ImageRepository } from "../repositories/ImageRepository";

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
    private readonly fileProcessingProducer: FileProcessingQueueProducer,
    private readonly notificationProducer: NotificationQueueProducer,
    private readonly analyticsQueueProducer: AnalyticsQueueProducer
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
    await this.fileProcessingProducer.enqueueFileProcessingJob({
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

    await this.analyticsQueueProducer.enqueueTrackAnalyticsJob({
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
