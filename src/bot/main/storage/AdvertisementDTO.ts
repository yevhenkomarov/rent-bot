interface AdvertisementDTO {
    id?: string,
    type?: string,
    link?: string,
    creationDate?: Date,
    street?: string,
    phone?: number[],
    floor?: number,
    roomsCount?: number,
    area?: number,
    descriptionUa?: string,
    descriptionRu?: string,
    price?: number,
    currency?: string
}