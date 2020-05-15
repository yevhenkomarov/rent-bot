import superagent from 'superagent';
import { TrackingResults } from './response/TrackingResults';
import { RentInfoData } from './response/RentInfoData';
import { DataAccessor } from '../storage/DataAccessor';

export interface ITrackerService{
    track():TrackingResults;
    trackTest(request:string):void;
}

const dataAccessor = new DataAccessor();
export class TrackerService implements ITrackerService{
    track(): TrackingResults {
        //GET
        return new TrackingResults();
    }
    trackTest(request:string){
            superagent.get(request).end((err, resp) => {
                this.onResponse(resp.body);
            });
    }
    
    onResponse(ids:any){
        let result = new Array<RentInfoData>(3);        
        for (let index = 0; index < 3; index++) {
            const element = ids.items[index];
            superagent.get(`https://developers.ria.com/dom/info/${element}?api_key=oyYath7oUJjYJuWRajk9AJCVxvyQmEaNGJMQpv5V`).end(
                (err,res) => {
                    let curr = new RentInfoData();
                    curr.id = element;
                    curr.linkAddress = res.body.beautiful_url;
                    curr.street = res.body.street_id;
                    curr.area = res.body.total_square_meters;
                    curr.creationDate = res.body.created_at;
                    curr.floor = res.body.floor;
                    curr.roomsCount = res.body.rooms_count;
                    curr.type = res.body.type;
                    curr.phone = res.body.user_id; //retrieve phone number by userId
                    curr.desription = res.body.description_uk;
                    result[index] = curr;
                    if (index == result.length - 1) {
                        dataAccessor.updateData(result);
                    }
                }
            )               
        }
    }

}