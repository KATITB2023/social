export type Merchandise = {
    id : string;
    image : string;
    isPublished : boolean;
    name : string;
    price : number;
    stock : number;
    updatedAt : Date;
}

export type MerchandiseRequest = {
    id : string;
    merch : Merchandise;
    quantity : number;
    isApproved : boolean;
}