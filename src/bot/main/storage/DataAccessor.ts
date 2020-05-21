import { RentInfoData } from "../service/response/RentInfoData";
import fs = require('fs');

let currentData:Array<RentInfoData>;
export class DataAccessor{

    public updateData(newData:Array<RentInfoData>):void{
        if (currentData == undefined) {
            currentData = newData;
        }

        newData.forEach(element => {
            if (currentData.some((c) => c.id != element.id)) {
                currentData.push(element);
            }
        });
       
       currentData.forEach(element => {
           if (element.id) {
            fs.writeFile(`searchResults/${element.type}_${element.id}_${element.price}_${element.currency}.txt`, 
                element.descriptionUa + "\n"
                + `ціна: ${element.price} ${element.currency}` + "\n"
                + `https://dom.ria.com/uk/${element.linkAddress}` + "\n"
                + element.descriptionRu
            , (err) => {if(err) return})
           }
       });
    }
}