import { useLayoutEffect } from "react";
import { config } from "../../../configuration/config";
import { Counter } from "../../../shared/components/Counter";
import { ErrorCard } from "../../../shared/components/ErrorCard";
import { LoadingCard } from "../../../shared/components/LoadingCard";
import { useHttpRequest } from "../../../shared/hooks/useHttpRequest";
import { IRequest } from "../interfaces/interfaces";

type TraficAirport = {
    id:string;
    name:string;
    flights:number;
}

export const useAirportOne = (param: IRequest) => useHttpRequest<any,Array<TraficAirport>>(param);

export const AirportsOne = () =>{

    const {isLoading, data, error} = useAirportOne({
        url:`${config.apis.airports.url}/one`
    });

    useLayoutEffect(()=>{},[data]);

    return <div className="bg-gray-200 shadow-md py-3 px-3 rounded-md">
        <p className="text-sm text-gray-400">Aeropuerto(s) con <strong className="text-gray-600">mayor tráfico</strong> en el año</p>
        {
            isLoading === false && data 
            ?   <div className="flex space-x-2 justify-center items-center py-2">
                    {
                        data.map((fl:TraficAirport,index:number) =>{
                            return <Counter key={index} title={fl.name} number={fl.flights}/>
                        })
                    }
                </div> 
            : <LoadingCard />
        }

        {
            isLoading === false && error && <ErrorCard error={error}/>
        }
    </div>
}