import { RentInfoData } from "../service/response/RentInfoData";
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
            if (!currentData.includes(element)) {
                currentData.push(element);
            }
        });

        currentData.forEach(element => {
            if (element.id) {
                this.writeToDb(element);
            }
        });
    }
    
    writeToDb(element: RentInfoData) {
        this.dbConnection.addRentInfo(element);
    }

    async getAllItemsLinks(): Promise<Array<string>> {
        const all: Array<{link: string}> = await this.dbConnection.getAllAdvertisements() as Array<{link: string}>;
        return Array.from(all, (v, k) => v.link);
    }

    async getAllItemsIds(): Promise<Array<string>> {
        const all: Array<{id: string}> = await this.dbConnection.getAllAdvertisementsIds() as Array<{id: string}>;
        return Array.from(all, (v, k) => v.id);
    }

    getNewItems(userId: string | undefined) {
        return this.dbConnection.getUrlsForUser(userId);
    }

    getUsersToUpdate(): Promise<UserDataDto[]> {
        return this.dbConnection.getUsers();
    }
}