import { RentInfoData } from '../service/response/RentInfoData';
export class DataBuilder{
    public BuildData(ids:any):Array<RentInfoData>{

        let items:string[] = ids.items;
        let data:Array<RentInfoData> = new Array<RentInfoData>(items.length);
        
        for (let index = 0; index < items.length; index++) {
            const element = items[index];

        }

        return new Array();
    }
}