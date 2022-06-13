import { IHttpError } from "../../apps/is-admin-app/interfaces/interfaces";

interface IErrorCard {
    error: IHttpError
}
export const ErrorCard = ({error}:IErrorCard) =>{
    console.log("errorCad:", error);
    return <div className="text-gray-500">
        <p className="text-orange-500 text-md font-bold">no obtuvimos datos del servidor</p>
    </div>
}