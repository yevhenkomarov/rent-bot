import superagent from 'superagent';
import { RentInfoData } from './response/RentInfoData';
import { DataAccessor } from '../storage/DataAccessor';

export interface ITrackerService{
    track(requests:Array<string>):void;
    trackTest(request:string):void;
}

const dataAccessor = new DataAccessor();
export class TrackerService implements ITrackerService{
    track(requests:Array<string>) {
        requests.forEach(element => {
            superagent.get(element).end((err, resp) => {
                this.onResponse(resp.body);
            });
        });
    }
    trackTest(request:string){
            superagent.get(request).end((err, resp) => {
                this.onResponse(resp.body);
            });
    }
    
    onResponse(ids:any){
        let maxIndex = ids.items.length > 5 ? 5 : ids.items.length;
        let result = new Array<RentInfoData>(maxIndex);
        for (let index = 0; index < maxIndex; index++) {
            let element = ids.items[index];
            superagent.get(`https://developers.ria.com/dom/info/${element}?api_key=oyYath7oUJjYJuWRajk9AJCVxvyQmEaNGJMQpv5V`
            + '&lang_id=4').end(
                (err,res) => {
                    let curr = new RentInfoData();
                    curr.id = element;
                    curr.linkAddress = res.body.beautiful_url;
                    curr.street = res.body.street_id;
                    curr.area = res.body.total_square_meters;
                    curr.creationDate = res.body.created_at;
                    curr.floor = res.body.floor;
                    curr.roomsCount = res.body.rooms_count;
                    curr.type = res.body.realty_type_name_uk;
                    curr.phone = res.body.user_id; //retrieve phone number by userId
                    curr.descriptionUa = res.body.description_uk;
                    curr.descriptionRu = res.body.description;
                    curr.price = res.body.price_total;
                    curr.currency = res.body.currency_type;
                    result[index] = curr;
                    if (index == result.length - 1) {
                        dataAccessor.updateData(result);
                    }
                }
            )               
        }
    }

}