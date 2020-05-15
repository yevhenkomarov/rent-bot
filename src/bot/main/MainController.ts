import { RequestBuilder }  from './service/request/RequestBuilder';
import { TrackingParamsData }  from './storage/TrackingParamsData';
import { ITrackerService, TrackerService }  from './service/TrackerService';
import { DataBuilder } from './dataBuilder/DataBuilder';

const updateTime:number = 10;
const requestBuilder = new RequestBuilder();
let dataBuilder = new DataBuilder();
var trackerService:ITrackerService = new TrackerService();
export class MainController{
    private token:string;
    constructor(riaToken:string) {
            this.token = 'oyYath7oUJjYJuWRajk9AJCVxvyQmEaNGJMQpv5V';
    }
    public addTrackParams(params:TrackingParamsData){};
    public getTrackedData(){};
    public async TrackTest(){
        let request:string = requestBuilder.buildTest();
        let ids = await trackerService.trackTest(request);
        // let builderResult = dataBuilder.BuildData(ids);
    }
}