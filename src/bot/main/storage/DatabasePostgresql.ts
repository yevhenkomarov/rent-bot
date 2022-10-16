import { Client } from 'pg';
import { RentInfoData } from '../service/response/RentInfoData';
import { UserDataDto } from './Database';
import { IDataBase } from './IDataBase';

export class PostgresqlDatabase implements IDataBase {
    private readonly client: Client;
    constructor() {
        this.client = new Client({
            host: 'dpg-ccp1a9qen0hrldbq61pg-a.oregon-postgres.render.com',
            database: 'rent',
            user: 'admin',
            password: '7tywzIFXeu6JYmo5gbU7c6J27FQeUIkN',
            port: 5432,
            ssl: true
        })

        try {
            this.client.connect();
            this.client.addListener('connect', () => {
                console.log('connect');
            })
        } catch (error) {
            console.log('error');
        }
    }
    async addRentInfo(element: RentInfoData): Promise<any> {

        try {
            const queryResult = await this.client.query('SELECT id FROM rentable');
            const existing = queryResult.rows as Array<{id: number}>;
            if (existing?.some(x => x.toString() == element.id)) {
                return;
            }
        } catch (error) {
            console.log(error);
        }

        try {
            let description = element.descriptionUa ?? element.descriptionRu;
            description?.slice(0, 99);
            if (!description) {
                description = '*';
            }
            await this.client
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
    async getAllAdvertisements(): Promise<AdvertisementDTO[]> {
        const res = await this.client?.query('SELECT * FROM rentable');
        const result = Array.from(res.rows) as AdvertisementDTO[];
        return result;
    }
    async getAllAdvertisementsIds(): Promise<any> {
        const res = await this.client?.query('SELECT * FROM rentable');
        const result = Array.from(res.rows) as AdvertisementDTO[];
        return Array.from(result, (v) => v.link);
    }
    getUrlsForUser(userId: string | undefined): Promise<string[]> {
        try {
        } catch (error) {
            console.log('Method not implemented getUrlsForUser.');
        }
        return Promise.resolve(
            []
        );
    }
    getUsers(): Promise<UserDataDto[]> {
        try {
        } catch (error) {
            console.log('Method not implemented getUsers.');
        }
        return Promise.resolve(
            []
        );
    }

    async addUserToList(userChatId: number, userName?: string): Promise<string> {
        const existingUsers = await this.requestUsersFromDb();

        if (existingUsers.some(user => user.chat_id == userChatId)) {
            console.log(`user ${userName} with id ${userChatId} has already been added previously`);
            return "такий користувач вже зареєстрований";
        }

        console.log(`user ${userName} with id ${userChatId} has been added to db`);
        this.client?.query(`INSERT INTO users VALUES (${userChatId},'${userName}', '[]')`)
        return "користувача додано";
    }

    private async requestUsersFromDb(): Promise<UserDataDto[]> {
        let result: UserDataDto[] | null = null;
        try {
            this.client.database
            const res = await this.client.query('SELECT * FROM users');
            result = Array.from(res.rows, (v) => {
                const userData = new UserDataDto();
                userData.chat_id = v.id;
                userData.user_name = v.user_name;
                userData.shown_ids = v.shown_ids;
                return userData;
            });
        } catch (error) {
            console.log('fail');
        }

        return result ?? [];
    }
}
