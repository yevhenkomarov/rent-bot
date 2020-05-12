import superagent from 'superagent';
import { TrackingResults } from './response/TrackingResults';

export interface ITrackerService{
    track():TrackingResults;
    trackTest(request:string):Promise<string>;
}

export class TrackerService implements ITrackerService{
    track(): TrackingResults {
        //GET
        return new TrackingResults();
    }
    trackTest(request:string):Promise<string>{
        return new Promise<string>((resolve, reject) => {
            superagent.get(request).end((err, resp) => {
                resolve(resp.body);
                reject(err);
        });
    }
)}}