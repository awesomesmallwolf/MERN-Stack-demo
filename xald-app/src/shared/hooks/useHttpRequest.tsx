import {useLayoutEffect, useState } from "react";
import { IHttpError, IRequest } from "../../apps/is-admin-app/interfaces/interfaces";

export type SendRequest = {
    payload: any;
}
export type HookHttpRequestResult<T> = {
    isLoading:boolean;
    data:T | undefined,
    error:IHttpError | undefined;
    send: (request:SendRequest)=> void;
}


export const useHttpRequest = <R,T>({url, auto=true }:IRequest): HookHttpRequestResult<T> => {

    const [isLoading, setIsLoading] = useState<boolean>(auto);
    const [data, setData] = useState<T>();
    const [error, setError] = useState<IHttpError>();
    
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
        setIsLoading(false);
    }

    const send = (request:SendRequest) => {
        setIsLoading(true);
        return fetch(url).then(onData)
        .catch(onError);
    }

    useLayoutEffect(()=>{

        if(auto === false) return;
        fetch(url)
        .then(onData)
        .catch(onError);

    },[url, error, auto]);

    return { isLoading, data, error, send }
}