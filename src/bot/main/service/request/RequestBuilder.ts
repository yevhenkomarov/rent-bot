import { TrackRequest } from './TrackRequest'

var fullRequest:string;
export class RequestBuilder{
    public buildTest():string{
        fullRequest = TrackRequest.endpoint
        + TrackRequest.search
        + TrackRequest.category + 4
        + TrackRequest.realtyType + 0
        + TrackRequest.operation + 3
        + TrackRequest.state + 1
        + TrackRequest.city + 1
        + TrackRequest.areaFrom + 60
        + TrackRequest.roomCountFrom + 2
        + TrackRequest.excludeAgencies
        + TrackRequest.apiKey
        + 'oyYath7oUJjYJuWRajk9AJCVxvyQmEaNGJMQpv5V';
        return fullRequest;
    }
}