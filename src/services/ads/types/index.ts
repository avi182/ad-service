import { Request } from "express";
import { UserTargetingData } from "../../../middlewares/middleware";

export type AdsRequestType = Request<{}, {}, {}, UserTargetingData>;

export type UserAgentData = { browser: string; operatingSystem: string };

export type CreateNewAdPayload = {
  id: string;
  description: string;
  imageUrl: string;
  targeting: {
    location: { lat: number; long: number; radius: number };
    operatingSystems: string[];
    browsers: string[];
    tags: string[];
  };
};
