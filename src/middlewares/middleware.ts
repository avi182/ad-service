import { NextFunction, Request, Response } from "express";

export const extractAdParams = (
  req: Request<{}, {}, {}, any>,
  res: Response,
  next: NextFunction
) => {
  if (typeof req.query["tag"] === "string") {
    req.query["tag"] = [req.query["tag"]];
  }
  req.query = extractQueryParams(req.query);
  next();
};

const extractQueryParams = (queryParams: {
  lat: string;
  long: string;
  tag: string[];
}): UserTargetingData => {
  let { lat = 0, long = 0, tag = [] } = queryParams;
  lat = Number(lat);
  long = Number(long);
  return { lat, long, tags: tag };
};

export type UserTargetingData = {
  lat: number;
  long: number;
  tags: string[];
};
