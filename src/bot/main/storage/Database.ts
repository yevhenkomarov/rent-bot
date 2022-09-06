import mysql, { Connection } from "mysql2";
import { RentInfoData } from "../service/response/RentInfoData";

export class Database {

    private readonly dbConnection: Connection;
    private readonly onUsersUpdatedFn: (n:UserDataDto[]) => void;

    constructor(fn: (n:UserDataDto[]) => void) {
        this.onUsersUpdatedFn = fn;
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
        })
        this.requestUsersFromDb();
    }

    addUserToList(userChatId: number, userName?: string) {
        // this.dbConnection.query('USE tg_users')
        this.dbConnection.query(`INSERT INTO users VALUES (${userChatId},'${userName}')`)
    }

    addRentInfo(element: RentInfoData) {
        this.dbConnection.query('SELECT id FROM rentable', (err: any, ids: {id: number}[], d: any) => {
            if (err) {
                console.log(err);
            }

            if (ids.some(existing => existing.id.toString() == element.id?.toString())) {
                return;
            }

            else {
                try {
                    this.dbConnection.query(`INSERT INTO rentable VALUES (${element.id}, '${element.type}', ${element.price}, '${element.street}', ${element.roomsCount}, ${element.floor}, '${element.descriptionUa?.slice(0, 99)}', ${element.phone}, '${element.linkAddress}', '${element.creationDate}')`);
                } catch (error) {
                    console.log(error);
                }
                
            }

        });
    }

    private requestUsersFromDb() {
        const result: UserDataDto[] = []
        this.dbConnection.query('SELECT chat_id, user_name FROM users', (err: any, usersData: UserDataDto[], d: any) => {
            if (err) {
                console.log(err);
            }

            usersData.forEach(element => {
                if (element.chat_id && element.user_name && !result.some(e => e.chat_id == element.chat_id)) {
                    result.push(element);
                }
            });
            console.log(usersData);
            console.log(d);
            this.onUsersUpdatedFn(result);
        });
    }
}


export class UserDataDto {
    chat_id: number | undefined
    user_name: string | undefined
}