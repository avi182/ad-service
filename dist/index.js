"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var ads_controller_1 = __importDefault(require("./services/ads/ads.controller"));
var app = express_1.default();
app.use("/", ads_controller_1.default);
app.listen(3333, function () { return console.log("Listening..."); });
