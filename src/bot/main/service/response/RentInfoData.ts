
export class RentInfoData{
    
    constructor(public id?:string,
        public type?:string, 
        public linkAddress?:string, 
        public creationDate?:Date, 
        public street?:string, 
        public phone?:number[], 
        public floor?:number, 
        public roomsCount?:number,
        public area?:number,
        public desription?:string) {                
    }
}
