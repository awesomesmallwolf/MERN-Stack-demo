
export interface IRequest {
    url:string;
    auto?:boolean;
}

export interface IHttpError {
    status:any;
    statusText:string;
    ex:any;
}