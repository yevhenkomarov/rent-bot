import { RequestBuilder }  from './service/request/RequestBuilder';
import { TrackerService }  from './service/TrackerService';
import fs = require('fs');
import { Container } from 'typedi';
import { DataAccessor } from './storage/DataAccessor';

const requestBuilder = new RequestBuilder();
var trackerService = Container.get(TrackerService);
var dataAccessor = Container.get(DataAccessor);

export function track() {
    fs.readFile('trackingParams.json', (err, callb) => {
    let trackParams:any;
        trackParams = JSON.parse(callb.toString());
        let requests = requestBuilder.buildByParams(trackParams);
        trackerService.track(requests);
    });        
}

export async function getTrackedData() {
    return await dataAccessor.getAllItems()
};

export async function getNewItems(userId: string) {
    return await dataAccessor.getNewItems(userId);
};

export function addTrackParams(){};