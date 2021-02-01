"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractAdParams = void 0;
var extractAdParams = function (req, res, next) {
    req.query = extractQueryParams(req.query);
    next();
};
exports.extractAdParams = extractAdParams;
var extractQueryParams = function (queryParams) {
    var _a = queryParams.lat, lat = _a === void 0 ? 0 : _a, _b = queryParams.long, long = _b === void 0 ? 0 : _b, _c = queryParams.tag, tag = _c === void 0 ? "" : _c;
    var tags = tag.split(",");
    lat = Number(lat);
    long = Number(long);
    return { lat: lat, long: long, tags: tags };
};
