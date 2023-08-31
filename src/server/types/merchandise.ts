export type Merchandise = {
    id : string;
    image : string;
    name : string;
    price : number;
    stock : number;
}

export type MerchandiseRequest = {
    id : string;
    merch : Merchandise;
    quantity : number;
    isApproved : boolean;
}