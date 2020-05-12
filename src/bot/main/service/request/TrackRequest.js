"use strict";
exports.__esModule = true;
var TrackRequest = /** @class */ (function () {
    function TrackRequest() {
    }
    TrackRequest.endpoint = "https://developers.ria.com/dom";
    TrackRequest.search = '/search?';
    TrackRequest.category = '&category=';
    TrackRequest.realtyType = '&realty_type=';
    TrackRequest.operation = '&operaon_type=';
    TrackRequest.state = '&state_id=';
    TrackRequest.city = '&city_id=';
    TrackRequest.dist = '&district_id=';
    TrackRequest.roomCountFrom = '&characterisc[209][from]=';
    TrackRequest.roomCountTo = '&characterisc[209][to]=';
    TrackRequest.areaFrom = '&characterisc[215][from]=';
    TrackRequest.areaTo = '&characterisc[215][to]=';
    TrackRequest.livingAreaFrom = '&characterisc[216][from]=';
    TrackRequest.livingAreaTo = '&characterisc[216][to]=';
    TrackRequest.kitchenAreaFrom = '&characterisc[218][from]=';
    TrackRequest.kitchenAreaTo = '&characterisc[218][to]=';
    TrackRequest.priceFrom = '&characterisc[234][from]=';
    TrackRequest.priceTo = '&characterisc[234][to]=';
    TrackRequest.withPhoto = '&with_photo';
    TrackRequest.withPhotos = '&photos_count_from=';
    TrackRequest.newBuildings = '&newbuildings';
    TrackRequest.excludeAgencies = '&exclude_agencies';
    TrackRequest.apiKey = '&api_key=';
    return TrackRequest;
}());
exports.TrackRequest = TrackRequest;
