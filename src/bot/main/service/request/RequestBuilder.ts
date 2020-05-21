import { SearchTrackRequest } from './SearchTrackRequest'

var fullRequest:string;
export class RequestBuilder{
    public buildByParams(trackParams:any):Array<string>{
        let results = new Array<string>();
        trackParams.items.forEach((element: any) => {
            let areaFrom:string;
            let areaTo:string;
            let priceFrom:string;
            let priceTo:string;
            if (element.category == 'flats') {
                areaFrom = SearchTrackRequest.flatAreaFrom;
                areaTo = SearchTrackRequest.flatAreaTo;
                priceFrom = SearchTrackRequest.flatPriceFrom;
                priceTo = SearchTrackRequest.flatPriceTo;
            } else {
                areaFrom = SearchTrackRequest.houseAreaFrom;
                areaTo = SearchTrackRequest.houseAreaTo;
                priceFrom = SearchTrackRequest.housePriceFrom;
                priceTo = SearchTrackRequest.housePriceTo;
            }
            let request = SearchTrackRequest.endpoint
            + SearchTrackRequest.search
            + SearchTrackRequest.category + SearchTrackRequest.categoryMap.get(element.category)
            + SearchTrackRequest.realtyType + SearchTrackRequest.realtytypeMap.get(element.type)
            + SearchTrackRequest.operation + SearchTrackRequest.operationMap.get(element.operation)
            + SearchTrackRequest.state + 1
            + SearchTrackRequest.city + 1
            + SearchTrackRequest.roomCountFrom + element.minRooms
            + SearchTrackRequest.roomCountTo + element.maxRooms
            + priceFrom + element.minPrice
            + priceTo + element.maxPrice
            + areaFrom + element.minArea
            + areaTo + element.maxArea
            + SearchTrackRequest.excludeAgencies + element.excludeAgencies
            + SearchTrackRequest.apiKey + 'oyYath7oUJjYJuWRajk9AJCVxvyQmEaNGJMQpv5V'
            + '&lang_id=4';
            results.push(request);
        });
        return results;
    }
    public buildTest():string{
        fullRequest = SearchTrackRequest.endpoint
        + SearchTrackRequest.search
        + SearchTrackRequest.category + 4
        + SearchTrackRequest.realtyType + 0
        + SearchTrackRequest.operation + 3
        + SearchTrackRequest.state + 1
        + SearchTrackRequest.city + 1
        + SearchTrackRequest.houseAreaFrom + 60
        + SearchTrackRequest.roomCountFrom + 2
        + SearchTrackRequest.excludeAgencies
        + SearchTrackRequest.apiKey
        + 'oyYath7oUJjYJuWRajk9AJCVxvyQmEaNGJMQpv5V';
        return fullRequest;
    }
}