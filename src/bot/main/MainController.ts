import { RequestBuilder }  from './service/request/RequestBuilder';
import { TrackingParamsData }  from './storage/TrackingParamsData';
import { ITrackerService, TrackerService }  from './service/TrackerService';

const updateTime:number = 10;
const requestBuilder = new RequestBuilder();
var trackerService:ITrackerService = new TrackerService();
export class MainController{
    private token:string;
    constructor(riaToken:string) {
            this.token = 'oyYath7oUJjYJuWRajk9AJCVxvyQmEaNGJMQpv5V';
    }
    public addTrackParams(params:TrackingParamsData){};
    public getTrackedData(){};
    public async TrackTest():Promise<string>{
        let request:string = requestBuilder.buildTest();
        return Promise.resolve(trackerService.trackTest(request));
    }
    // public testResult = Promise.resolve(trackerService.trackTest(requestBuilder.buildTest()));
}