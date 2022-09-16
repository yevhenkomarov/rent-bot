import superagent from 'superagent';
import { RentInfoData } from './response/RentInfoData';
import { DataAccessor } from '../storage/DataAccessor';
import { Service } from 'typedi';

const token = 'oyYath7oUJjYJuWRajk9AJCVxvyQmEaNGJMQpv5V';
@Service()
export class TrackerService {

    constructor(private readonly dataAccessor: DataAccessor){};
    track(requests:Array<string>) {
        requests.forEach(element => {
            superagent.get(element).end((err, resp) => {
                try {
                    this.onResponse(resp?.body);
                }
                catch (err) {
                    console.log(err);
                }
            });
        });
    }
    
    onResponse(ids:any){
        let result = new Array<RentInfoData>(ids.items.length);
        for (let index = 0; index < ids.items.length; index++) {
            let element = ids.items[index];
            superagent.get(`https://developers.ria.com/dom/info/${element}?api_key=${token}`
            + '&lang_id=4').end(
                (err,res) => {

                    if (err) {
                        console.log(err);
                        return;
                    }

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
                    result.push(curr);
                    if (index == result.length - 1) {
                        this.dataAccessor.updateData(result);
                    }
                }
            )               
        }
    }

}