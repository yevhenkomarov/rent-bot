import { RequestBuilder }  from './service/request/RequestBuilder';
import { TrackerService }  from './service/TrackerService';
import fs = require('fs');
import { Container } from 'typedi';

const requestBuilder = new RequestBuilder();
var trackerService = Container.get(TrackerService);

export function track() {
    fs.readFile('trackingParams.json', (err, callb) => {
    let trackParams:any;
        trackParams = JSON.parse(callb.toString());
        let requests = requestBuilder.buildByParams(trackParams);
        trackerService.track(requests);
    });        
}

export function getTrackedData(): string[]{
    return trackerService.getUrls();
};

export function addTrackParams(){};