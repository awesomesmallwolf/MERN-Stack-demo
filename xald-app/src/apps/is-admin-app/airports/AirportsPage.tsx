import React, { useLayoutEffect } from "react";
import { config } from "../../../configuration/config";
import { HeaderBar } from "../../../shared/components/HeaderBar";
import { PageFooter } from "../../../shared/components/PageFooter";
import { PageTitle } from "../../../shared/components/PageTitle";
import { useHttpRequest } from "../../../shared/hooks/useHttpRequest";
import { IRequest } from "../interfaces/interfaces";
import { AirportsFour } from "./AirportsFour";
import { AirportsOne } from "./AirportsOne";
import { AirportsThree } from "./AirportsThree";
import { AirportsTwo } from "./AirportsTwo";

type InitializeData = {
    version:number;
}

export const useSend = (param: IRequest) => useHttpRequest<any,InitializeData>(param);

export const AirportsPage = () => {

    return <main className="flex flex-col h-screen w-screen">
        <HeaderBar viewName="airports"/>
        <PageTitle title="airports"/>
        <HelpBanner />
        <AirportsContent />
        <PageFooter title="haz las cosas con amor, simpre!"/>
    </main>
}

export const AirportsContent = () => {
    return <section className="px-2 md:px-4 flex-1 flex flex-wrap gap-4 content-start justify-center">
        <AirportsOne />
        <AirportsTwo />
        <AirportsThree />
        <AirportsFour />
    </section>
}

export const HelpBanner = () =>{

    const {isLoading, data, error, send} = useSend({
        url:`${config.apis.airports.url}/initialize`,
        auto: false,
    });
    const onRestartDb = () =>{
        send({
            payload:{}
        },);
        window.location.reload();
    }

    useLayoutEffect(()=>{

    }, [isLoading, data]);

    return <div className="text-center pb-6">
        {
            isLoading 
            ? <p>cargando</p>
            : <React.Fragment>
                <p className="leading-tight text-orange-500">crees que los datos no son correctos?</p>
                <p className="text-blue-200 text-lg leading-tight">prueba a <button className="font-bold cursor-pointer text-green-600"
                onClick={onRestartDb}>reiniciar</button> la db</p>    
            </React.Fragment>
        }
    </div>
}