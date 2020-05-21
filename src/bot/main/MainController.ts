import { RequestBuilder }  from './service/request/RequestBuilder';
import { ITrackerService, TrackerService }  from './service/TrackerService';
import fs = require('fs');

const updateTime:number = 10;
const requestBuilder = new RequestBuilder();
var trackerService:ITrackerService = new TrackerService();
export class MainController{
    private token:string;
    constructor(riaToken:string) {
            this.token = 'oyYath7oUJjYJuWRajk9AJCVxvyQmEaNGJMQpv5V';
    }
    public addTrackParams(){};
    public getTrackedData(){};
    public track(){
        let trackParams:any;
        fs.readFile('trackingParams.json', (err, callb) => {
        let trackParams:any;
            trackParams = JSON.parse(callb.toString());
            let requests = requestBuilder.buildByParams(trackParams);
            trackerService.track(requests);
        });        
    }
}