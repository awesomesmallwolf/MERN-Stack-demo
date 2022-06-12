import { config } from "../../../configuration/config";
import { Counter } from "../../../shared/components/Counter";
import { ErrorCard } from "../../../shared/components/ErrorCard";
import { LoadingCard } from "../../../shared/components/LoadingCard";
import { useHttpRequest } from "../../../shared/hooks/useHttpRequest";
import { IRequest } from "../interfaces/interfaces";

type TraficDayAirline = {
    id:string;
    name:string;
    flights:number;
}

export const useAirportFour = (param: IRequest) => useHttpRequest<any,Array<TraficDayAirline>>(param);

export const AirportsFour = () =>{

    const {isLoading, data, error} = useAirportFour({
        url:`${config.apis.airports.url}/four`
    });

    return <div className="bg-gray-200 shadow-md py-3 px-3 rounded-md">
        <p className="text-sm text-gray-400">Aerolinea con <strong className="text-gray-600">más de 2</strong> vuelos por día</p>
        {
            isLoading === false && data 
            ?   <div className="flex space-x-2 justify-center items-center py-2">
                    {
                        data.map((a:TraficDayAirline,index:number) =>{
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