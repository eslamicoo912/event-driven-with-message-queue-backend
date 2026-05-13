import { Schema, model, Types, type InferSchemaType } from "mongoose";

const analyticsEventSchema = new Schema(
  {
    userId: {
      type: Types.ObjectId,
      ref: "User",
      default: null,
      index: true
    },
    eventName: {
      type: String,
      required: true,
      index: true
    },
    properties: {
      type: Schema.Types.Mixed,
      default: {}
    },
    source: {
      type: String,
      default: "api"
    }
  },
  { timestamps: true }
);

export type AnalyticsEventDocument = InferSchemaType<typeof analyticsEventSchema> & {
  _id: { toString(): string };
  createdAt: Date;
  updatedAt: Date;
};

export const AnalyticsEventModel = model("AnalyticsEvent", analyticsEventSchema);
