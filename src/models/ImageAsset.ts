import { Schema, model, Types, type InferSchemaType } from "mongoose";

const imageAssetSchema = new Schema(
  {
    ownerId: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
      index: true
    },
    originalName: {
      type: String,
      required: true
    },
    mimeType: {
      type: String,
      required: true
    },
    size: {
      type: Number,
      required: true
    },
    path: {
      type: String,
      required: true
    },
    processingStatus: {
      type: String,
      enum: ["pending", "processed", "failed"],
      default: "pending"
    }
  },
  { timestamps: true }
);

export type ImageAssetDocument = InferSchemaType<typeof imageAssetSchema> & {
  _id: { toString(): string };
  createdAt: Date;
  updatedAt: Date;
};

export const ImageAssetModel = model("ImageAsset", imageAssetSchema);
