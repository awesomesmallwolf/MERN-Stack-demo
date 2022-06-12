import React from "react";
import { IHttpError } from "../../apps/is-admin-app/interfaces/interfaces";

interface IErrorCard {
    error: IHttpError
}
export const ErrorCard = ({error}:IErrorCard) =>{
    return <div>
        <pre>{JSON.stringify(error)}</pre>
    </div>
}