import express, { Request, Response } from "express";
import {
  UserTargetingData,
  extractAdParams,
} from "../../middlewares/middleware";
import { AdsRequestType, CreateNewAdPayload } from "./types";
import AdsLogic from "./ads.logic";
import { extractUserAgent } from "./util";
import { EventEmitter } from "../../mq";

const adRouter = express.Router();

adRouter.post("/", async (req: Request, res: Response) => {
  EventEmitter.publish("create-ad", [req.body]);
  res.send({ msg: "Ad queued successfully" });
});

adRouter.get(
  "/",
  extractAdParams,
  async (req: AdsRequestType, res: Response) => {
    const userAgent = extractUserAgent(req.useragent);
    let { lat, long, tags }: UserTargetingData = req.query;
    const ads = await AdsLogic.find({ lat, long, tags }, userAgent);
    res.send({ ads });
  }
);

adRouter.get(
  "/best",
  extractAdParams,
  async (req: AdsRequestType, res: Response) => {
    const userAgent = extractUserAgent(req.useragent);
    let { lat, long, tags }: UserTargetingData = req.query;
    const [ad] = await AdsLogic.find({ lat, long, tags }, userAgent, 1);
    res.send({ ad });
  }
);

EventEmitter.subscribe(
  "create-ad",
  async (newAd: CreateNewAdPayload): Promise<void> => {
    await AdsLogic.create(newAd);
  }
);

export default adRouter;
