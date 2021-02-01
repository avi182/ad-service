import express from "express";
import AdsController from "./services/ads/ads.controller";
import { connect as initDBConnection } from "./db";
import bodyParser from "body-parser";
var useragent = require("express-useragent");

const app = express();
var jsonParser = bodyParser.json();

app.use(useragent.express());
app.use(jsonParser);
app.use("/ads", AdsController);

(async () => {
  await initDBConnection();
  app.listen(3333, () => console.log("Listening..."));
})();
