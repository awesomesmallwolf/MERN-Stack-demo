import {useLayoutEffect, useState } from "react";
import { IHttpError, IRequest } from "../../apps/is-admin-app/interfaces/interfaces";

export type HookHttpRequestResult<T> = {
    isLoading:boolean;
    data:T | undefined,
    error:IHttpError | undefined;
}


export const useHttpRequest = <R,T>({url}:IRequest): HookHttpRequestResult<T> => {

    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [data, setData] = useState<T>();
    const [error, setError] = useState<IHttpError>();
    
    useLayoutEffect(()=>{

        const onData = async (result:any)=>{
            const data =  await result.json();
            setData(data);
            setIsLoading(false);
        }

        const onError = (result:any)=>{
            setError({
                status: result.status,
                statusText: result.statusText,
                ex:result.ex
            });
            alert(JSON.stringify(error));
            setIsLoading(false);
        }

        fetch(url)
        .then(onData)
        .catch(onError);

    },[url, error]);

    return { isLoading, data, error }
}