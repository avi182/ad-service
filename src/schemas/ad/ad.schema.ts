import mongoose from "mongoose";

export type Ad = {
  id?: string;
  description: string;
  imageUrl: string;
  targeting: {
    location: { lat: number; long: number; radius: number };
    operatingSystems: string[];
    browsers: string[];
    tags: string[];
  };
};

const adSchema = new mongoose.Schema(
  {
    description: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      unique: true,
      required: true,
    },
    targeting: {
      type: {
        location: { lat: typeof Number, long: Number, radius: Number },
        operatingSystems: [String],
        browsers: [String],
        tags: [String],
      },
      required: true,
    },
  },
  { versionKey: false }
);

adSchema.index({ imageUrl: 1 });

const Ad = mongoose.model("Ad", adSchema);

export default Ad;
