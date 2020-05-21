
export class SearchTrackRequest{

static endpoint:string = "https://developers.ria.com/dom";
static search:string = '/search?';
static category:string = '&category=';
static realtyType:string = '&realty_type=';
static operation:string = '&operation_type=';
static state:string = '&state_id=';
static city:string = '&city_id=';
static dist:string = '&district_id=';
static roomCountFrom:string = '&characteristic[209][from]=';
static roomCountTo:string = '&characteristic[209][to]=';
static houseAreaFrom:string = '&characteristic[215][from]=';
static houseAreaTo:string = '&characteristic[215][to]=';
static flatAreaFrom:string = '&characteristic[214][from]=';
static flatAreaTo:string = '&characteristic[214][to]=';
static livingAreaFrom:string = '&characteristic[216][from]=';
static livingAreaTo:string = '&characteristic[216][to]=';
static kitchenAreaFrom:string = '&characteristic[218][from]=';
static kitchenAreaTo:string = '&characteristic[218][to]=';
static housePriceFrom:string = '&characteristic[234][from]=';
static housePriceTo:string = '&characteristic[234][to]=';
static flatPriceFrom:string = '&characteristic[235][from]=';
static flatPriceTo:string = '&characteristic[235][to]=';
static withPhoto:string = '&with_photo=';
static withPhotos:string = '&photos_count_from=';
static newBuildings:string = '&newbuildings';
static excludeAgencies:string = '&exclude_agencies=';
static apiKey:string = '&api_key=';

static realtytypeMap:Map<string, string> = new Map<string, string>(
    [
        [ 'flat', '2' ],
        [ 'room', '3' ],
        [ 'halfOfHouse', '6' ],
        [ 'house', '5' ],
        [ 'dacha', '7' ]
    ])

static operationMap:Map<string, string> = new Map<string, string>(
    [
        [ 'sell', '1' ],
        [ 'rentMonthly', '3' ],
        [ 'rentDaily', '4' ]
    ])

static categoryMap:Map<string, string> = new Map<string, string>(
    [
        [ 'flats', '1' ],
        [ 'houses', '4' ]
    ])

}