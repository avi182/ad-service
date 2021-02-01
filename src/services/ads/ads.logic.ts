import { Document } from "mongoose";
import { UserTargetingData } from "../../middlewares/middleware";
import AdSchema, { Ad } from "../../schemas/ad/ad.schema";
import { UserAgentData } from "./types";
import { isWithinRadius, LatLong } from "./util";

const find = async (
  targetData: UserTargetingData,
  userAgent: UserAgentData,
  limit?: number
): Promise<Ad[]> => {
  const { lat, long, tags } = targetData;
  const { browser, operatingSystem } = userAgent;
  const userLocation: LatLong = { lat, long };
  // Fetching matching tags ads
  const matchingAds = await AdSchema.find({
    "targeting.tags": { $in: tags },
    "targeting.operatingSystems": { $in: [operatingSystem.toLowerCase()] },
    "targeting.browsers": { $in: [browser.toLowerCase()] },
  });
  const filteredSortedAds: Ad[] = matchingAds
    .filter(({ targeting }: Ad) => {
      const { lat, long, radius } = targeting.location;
      const adBaseLocation: LatLong = { lat, long };
      return isWithinRadius(userLocation, adBaseLocation, radius);
    })
    .sort(compareTagIntersection(tags));
  return filteredSortedAds.slice(0, limit ? limit : filteredSortedAds.length);
};

const create = async (
  adData: Ad
): Promise<{ ad?: Document<Ad>; error?: Error }> => {
  try {
    const { description, imageUrl, targeting } = adData;
    const ad = await AdSchema.create({ description, imageUrl, targeting });
    return { ad };
  } catch (e) {
    return { error: e };
  }
};

export default { create, find };

const compareTagIntersection = (tags: string[]) => {
  (ad1: Ad, ad2: Ad) => {
    let a = 0;
    let b = 0;
    ad1.targeting.tags.forEach((tag) => {
      if (tags.includes(tag)) {
        a++;
      }
    });
    ad2.targeting.tags.forEach((tag) => {
      if (tags.includes(tag)) {
        b++;
      }
    });
    return b - a;
  };
};
