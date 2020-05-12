"use strict";
exports.__esModule = true;
var superagent_1 = require("superagent");
var TrackingResults_1 = require("./response/TrackingResults");
var TrackerService = /** @class */ (function () {
    function TrackerService() {
    }
    TrackerService.prototype.track = function () {
        //GET
        return new TrackingResults_1.TrackingResults();
    };
    TrackerService.prototype.trackTest = function (request) {
        return new Promise(function (resolve, reject) {
            superagent_1["default"].get(request).end(function (err, resp) {
                resolve(resp.body);
                reject(err);
            });
        });
    };
    return TrackerService;
}());
exports.TrackerService = TrackerService;
