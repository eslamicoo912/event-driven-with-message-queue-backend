import { Schema, model, Types, type InferSchemaType } from "mongoose";

const notificationSchema = new Schema(
  {
    userId: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
      index: true
    },
    type: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    message: {
      type: String,
      required: true
    },
    readAt: {
      type: Date,
      default: null
    }
  },
  { timestamps: true }
);

export type NotificationDocument = InferSchemaType<typeof notificationSchema> & {
  _id: { toString(): string };
  createdAt: Date;
  updatedAt: Date;
};

export const NotificationModel = model("Notification", notificationSchema);
