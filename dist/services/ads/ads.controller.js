"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var middleware_1 = require("../../middlewares/middleware");
var router = express_1.default.Router();
var mq_1 = require("../../mq");
router.get("/ads", middleware_1.extractAdParams, function (req, res) {
    var _a = req.query, lat = _a.lat, long = _a.long, tags = _a.tags;
    console.log(lat, long, tags);
    res.send("Many ads");
});
router.get("/ads/best", middleware_1.extractAdParams, function (req, res) {
    // TODO: COMPLETE LOGIC.
    res.send("One ad");
});
mq_1.mq.subscribe("create-ad", function (newAd) {
    // TODO: COMPLETE LOGIC.
    //   ack();
});
exports.default = router;
