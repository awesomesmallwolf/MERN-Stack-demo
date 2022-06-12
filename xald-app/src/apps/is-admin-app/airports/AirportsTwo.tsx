import { config } from "../../../configuration/config";
import { Counter } from "../../../shared/components/Counter";
import { ErrorCard } from "../../../shared/components/ErrorCard";
import { LoadingCard } from "../../../shared/components/LoadingCard";
import { useHttpRequest } from "../../../shared/hooks/useHttpRequest";
import { IRequest } from "../interfaces/interfaces";

type TraficAirline = {
    id:string;
    name:string;
    flights:number;
}

export const useAirportTwo = (param: IRequest) => useHttpRequest<any,Array<TraficAirline>>(param);

export const AirportsTwo = () =>{

    const {isLoading, data, error} = useAirportTwo({
        url:`${config.apis.airports.url}/two`
    });
    
    return <div className="bg-gray-200 shadow-md py-3 px-3 rounded-md">
        <p className="text-sm text-gray-400">Aerolinea(s) con <strong className="text-gray-600">mayor número vuelos</strong> durante el año</p>
        {
            isLoading === false && data 
            ?   <div className="flex space-x-2 justify-center items-center py-2">
                    {
                        data.map((a:TraficAirline,index:number) =>{
                            return <Counter key={index} title={a.name} number={a.flights}/>
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
