import { config } from "../../../configuration/config";
import { Counter } from "../../../shared/components/Counter";
import { ErrorCard } from "../../../shared/components/ErrorCard";
import { LoadingCard } from "../../../shared/components/LoadingCard";
import { useHttpRequest } from "../../../shared/hooks/useHttpRequest";
import { IRequest } from "../interfaces/interfaces";

type TraficDay = {
    day:string;
    count:number;
}

export const useAirportFour = (param: IRequest) => useHttpRequest<any,Array<TraficDay>>(param);

export const AirportsThree = () =>{

    const {isLoading, data, error} = useAirportFour({
        url:`${config.apis.airports.url}/three`
    });

    return <div className="bg-gray-200 shadow-md py-3 px-3 rounded-md">
        <p className="text-sm text-gray-400">Día con <strong className="text-gray-600">mayor número</strong> de vuelos</p>
        {
            isLoading === false && data 
            ?   <div className="flex space-x-2 justify-center items-center py-2">
                {
                    data.map((td:TraficDay,index:number) =>{
                        return <Counter key={index} title={td.day} number={td.count}/>
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