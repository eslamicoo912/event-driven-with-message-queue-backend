import { ImageAssetModel, type ImageAssetDocument } from "../models/ImageAsset";

export interface CreateImageInput {
  ownerId: string;
  originalName: string;
  mimeType: string;
  size: number;
  path: string;
}

export class ImageRepository {
  async create(input: CreateImageInput): Promise<ImageAssetDocument> {
    return ImageAssetModel.create(input);
  }

  async updateProcessingStatus(
    id: string,
    processingStatus: "pending" | "processed" | "failed"
  ): Promise<void> {
    await ImageAssetModel.findByIdAndUpdate(id, { processingStatus }).exec();
  }
}
