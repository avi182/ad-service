import { Details } from "express-useragent";
import { UserAgentData } from "../types";

export type LatLong = {
  lat: number;
  long: number;
};

const distance = (base: LatLong, target: LatLong): number => {
  const { lat: lat1, long: lon1 } = base;
  const { lat: lat2, long: lon2 } = target;
  var p = 0.017453292519943295; // Math.PI / 180
  var c = Math.cos;
  var a =
    0.5 -
    c((lat2 - lat1) * p) / 2 +
    (c(lat1 * p) * c(lat2 * p) * (1 - c((lon2 - lon1) * p))) / 2;

  return 12742 * Math.asin(Math.sqrt(a)); // 2 * R; R = 6371 km
};

export const isWithinRadius = (
  base: LatLong,
  target: LatLong,
  maxDistance: number
): boolean => {
  const distanceBetweenPoints = distance(base, target);
  return distanceBetweenPoints <= maxDistance ? true : false;
};

export const extractUserAgent = (userAgentData?: Details): UserAgentData => {
  const browser = userAgentData?.browser || "",
    operatingSystem = userAgentData?.os || "";
  return { browser, operatingSystem };
};
