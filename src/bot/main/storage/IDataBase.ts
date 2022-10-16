import { RentInfoData } from "../service/response/RentInfoData";
import { UserDataDto } from "./Database";

export interface IDataBase {
    addRentInfo(element: RentInfoData): void;
    getAllAdvertisements(): Promise<AdvertisementDTO[]>;
    getAllAdvertisementsIds(): Promise<any>;
    getUrlsForUser(userId: string | undefined): Promise<string[]>;
    getUsers(): Promise<UserDataDto[]>;
    addUserToList(userChatId: number, userName?: string): Promise<string>;
}