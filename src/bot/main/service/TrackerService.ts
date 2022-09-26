import superagent from 'superagent';
import { RentInfoData } from './response/RentInfoData';
import { DataAccessor } from '../storage/DataAccessor';
import { Service } from 'typedi';

const token = 'oyYath7oUJjYJuWRajk9AJCVxvyQmEaNGJMQpv5V';
@Service()
export class TrackerService {

    constructor(private readonly dataAccessor: DataAccessor) { };

    async trackAsync(requests: Array<string>) {
        for (const req of requests) {
            const response = await superagent.get(req);
            await this.getDataFromIds(response.body);
        }
    }

    track(requests: Array<string>) {
        requests.forEach(element => {
            superagent.get(element).end((err, resp) => {
                try {
                    this.onResponse(resp?.body);
                }
                catch (error) {
                    console.log(error);
                }
                if (err) {
                    console.log(err);
                }
            });
        });
    }

    async getDataFromIds(ids: any) {
        let result = new Array<RentInfoData>();
        const existingItemsLinks = await this.dataAccessor.getAllItemsIds();
        for (let index = 0; index < ids.items.length; index++) {
            const element = ids.items[index];

            if (existingItemsLinks.includes(`${element}`)) {
                continue;
            }

            const info = await superagent.get(`https://developers.ria.com/dom/info/${element}?api_key=${token}` + '&lang_id=4');
            let curr = new RentInfoData();
                        curr.id = element;
                        curr.linkAddress = info.body.beautiful_url;
                        curr.street = info.body.street_id;
                        curr.area = info.body.total_square_meters;
                        curr.creationDate = info.body.created_at;
                        curr.floor = info.body.floor;
                        curr.roomsCount = info.body.rooms_count;
                        curr.type = info.body.realty_type_name_uk;
                        curr.phone = info.body.user_id; //retrieve phone number by userId
                        curr.descriptionUa = info.body.description_uk;
                        curr.descriptionRu = info.body.description;
                        curr.price = info.body.price_total;
                        curr.currency = info.body.currency_type;
                        result.push(curr);
                        existingItemsLinks.push(element);
        }
        this.dataAccessor.updateData(result);
    }

    onResponse(ids: any) {
        let result = new Array<RentInfoData>();
        for (let index = 0; index < ids.items.length; index++) {
            let element = ids.items[index];
            superagent.get(`https://developers.ria.com/dom/info/${element}?api_key=${token}`
                + '&lang_id=4').end(
                    (err, res) => {

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
                    }
                )
        }
        this.dataAccessor.updateData(result);
    }

}