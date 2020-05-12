"use strict";
exports.__esModule = true;
var TrackRequest_1 = require("./TrackRequest");
var fullRequest;
var RequestBuilder = /** @class */ (function () {
    function RequestBuilder() {
    }
    RequestBuilder.prototype.buildTest = function () {
        fullRequest = TrackRequest_1.TrackRequest.endpoint
            + TrackRequest_1.TrackRequest.search
            + TrackRequest_1.TrackRequest.category + 4
            + TrackRequest_1.TrackRequest.realtyType + 0
            + TrackRequest_1.TrackRequest.operation + 3
            + TrackRequest_1.TrackRequest.state + 1
            + TrackRequest_1.TrackRequest.city + 1
            + TrackRequest_1.TrackRequest.areaFrom + 60
            + TrackRequest_1.TrackRequest.roomCountFrom + 2
            + TrackRequest_1.TrackRequest.excludeAgencies
            + TrackRequest_1.TrackRequest.apiKey
            + 'oyYath7oUJjYJuWRajk9AJCVxvyQmEaNGJMQpv5V';
        return fullRequest;
    };
    return RequestBuilder;
}());
exports.RequestBuilder = RequestBuilder;
