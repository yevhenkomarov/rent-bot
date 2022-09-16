import mysql, { Connection, RowDataPacket } from "mysql2";
import { RentInfoData } from "../service/response/RentInfoData";

export class Database {

    private dbConnection: Connection | undefined;

    constructor() {
        try {
            this.dbConnection =
                this.dbConnection = mysql.createConnection({
                    host: "localhost",
                    user: "root",
                    database: "rent",
                    password: "Mkvpcb-18"
                });
            this.dbConnection.connect();
            this.dbConnection.ping(err => {
                if (err) {
                    console.log(err);
                }
            });
            
        } catch (error) {
            console.log(error);
        }
    }
    getUsers(): Promise<UserDataDto[]> {
        return this.requestUsersFromDb();
    }

    async getUrlsForUser(userId: string | undefined): Promise<string[]> {
        const allAdvertisements = await this.getAllAdvertisements() as Array<{ link: string, id: number }>;
        const existingUsers = await this.requestUsersFromDb();
        const urls: Array<string> = [];
        const ids: Array<string> = [];
        const currentUserData = existingUsers.find(user => user.chat_id?.toString() == userId);

        if (!currentUserData) {
            console.log(`no user with id ${userId}`);
            return [];
        }

        for (let index = 0; index < allAdvertisements.length; index++) {
            const adv = allAdvertisements[index];
            if (currentUserData?.shown_ids?.some(id => id == adv.id.toString())) {
                continue;
            }
            else {
                urls.push(adv.link);
            }
        }

        this.addIdToShown(userId, Array.from(allAdvertisements, (v) => v.id.toString()));
        return urls;
    }

    async getAllAdvertisements(){
        return await this.dbConnection?.promise().query('SELECT link, id FROM rentable')
            .then(([rows,fields]) => {
                return rows;
            });
    }

    async addUserToList(userChatId: number, userName?: string): Promise<string> {
        const existingUsers =  await this.requestUsersFromDb();

        if (existingUsers.some(user => user.chat_id == userChatId)){
            console.log(`user ${userName} with id ${userChatId} has already been added previously`);
            return "такий користувач вже зареєстрований";
        }

        console.log(`user ${userName} with id ${userChatId} has been added to db`);
        this.dbConnection?.query(`INSERT INTO users VALUES (${userChatId},'${userName}', '[]')`)
        return "користувача додано";
    }

    async addRentInfo(element: RentInfoData) {
        let existing = await this.dbConnection?.promise().query('SELECT id FROM rentable')
        .then(([rows, fields]) => {
            return rows;
        })
        .catch(([reason]) => {
            console.log(reason);
        });

        const ss = existing as Array<{id: number}>;
        if (ss?.some(x => x.toString() == element.id)) {
            return;
        }

        try {
            let description = element.descriptionUa ?? element.descriptionRu;
            description?.slice(0, 99);
            if (!description) {
                description = '*';
            }
            await this.dbConnection?.promise()
            .query(`INSERT INTO rentable (id, title, price, district, rooms, floor, description, phone, link, published) VALUES (${element.id}, 
                '${element.type}', 
                ${element.price}, 
                '${element.street}', 
                ${element.roomsCount}, 
                ${element.floor}, 
                '${description}',
                ${element.phone},
                '${element.linkAddress}', 
                '${element.creationDate}')`);
                console.log('INSERT INTO rentable VALUES');
        } catch (error) {
            console.log(error);
        }
    }

    private addIdToShown(userId: string | undefined, shownIds: string[]) {
        const json = JSON.stringify(shownIds);
        this.dbConnection?.query(`update users set shown_ids='${json}' where chat_id='${userId}'`)
    }

    private async requestUsersFromDb(): Promise<UserDataDto[]> {
        if (!this.dbConnection){
            console.log("db is not initialized");
            return Promise.resolve([]);
        }
        return await this.dbConnection.promise().query('SELECT chat_id, user_name, shown_ids FROM users')
        .then(([rows,fields]) => {
            return rows as UserDataDto[];
        });
    }
}


export class UserDataDto {
    chat_id: number | undefined
    user_name: string | undefined
    shown_ids: string[] | undefined
}