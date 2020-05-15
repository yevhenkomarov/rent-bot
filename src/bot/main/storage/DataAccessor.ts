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

    //    fs.createWriteStream('/out');
    //    let ss = new fs.WriteStream();
    //    ss.pipe(fs.createWriteStream('/out'));
       
       currentData.forEach(element => {
        fs.writeFile('file.txt', element.desription, (err) => {if(err) return})
       });
    }
}