import { SearchTrackRequest } from './SearchTrackRequest'

var fullRequest:string;
export class RequestBuilder{
    public buildTest():string{
        fullRequest = SearchTrackRequest.endpoint
        + SearchTrackRequest.search
        + SearchTrackRequest.category + 4
        + SearchTrackRequest.realtyType + 0
        + SearchTrackRequest.operation + 3
        + SearchTrackRequest.state + 1
        + SearchTrackRequest.city + 1
        + SearchTrackRequest.areaFrom + 60
        + SearchTrackRequest.roomCountFrom + 2
        + SearchTrackRequest.excludeAgencies
        + SearchTrackRequest.apiKey
        + 'oyYath7oUJjYJuWRajk9AJCVxvyQmEaNGJMQpv5V';
        return fullRequest;
    }
}