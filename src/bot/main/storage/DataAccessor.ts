import { RentInfoData } from "../service/response/RentInfoData";
import fs = require('fs');
import { Database, UserDataDto } from "./Database";
import { Service } from 'typedi';

let currentData: Array<RentInfoData>;

@Service()
export class DataAccessor {

    private dbConnection: Database;

    constructor() {
        this.dbConnection = new Database();
    }

    addUserToDb(userChatId: number, userName?: string): Promise<string> {
        return this.dbConnection.addUserToList(userChatId, userName);
    }

    updateData(newData: Array<RentInfoData>): void {
        if (currentData == undefined) {
            currentData = newData;
        }

        newData.forEach(element => {
            if (currentData.some((c) => c.id != element.id)) {
                currentData.push(element);
            }
        });

        if (!fs.existsSync('searchResults')) {
            fs.mkdir('searchResults', () => { })
        }

        currentData.forEach(element => {
            if (element.id) {
                this.writeToDb(element);

                fs.writeFile(`searchResults/${element.type}_${element.id}_${element.price}_${element.currency}.txt`,
                    element.descriptionUa + "\n"
                    + `ціна: ${element.price} ${element.currency}` + "\n"
                    + `https://dom.ria.com/uk/${element.linkAddress}` + "\n"
                    + element.descriptionRu
                    , (err) => { if (err) return })
            }
        });
    }
    writeToDb(element: RentInfoData) {
        this.dbConnection.addRentInfo(element);
    }

    getAllItems() {
        return this.dbConnection.getAllAdvertisements();
    }

    getNewItems(userId: string | undefined) {
        return this.dbConnection.getUrlsForUser(userId);
    }

    getUsersToUpdate(): Promise<UserDataDto[]> {
        return this.dbConnection.getUsers();
    }
}