import React from "react";

interface ISplashView {
    location:string;
}


const SplashView = (props:ISplashView) => {

    console.log("splash:rendering:location: ", props.location);
    return <main className="h-screen flex flex-col px-8 py-3">

        <div className="grow flex items-start justify-start pt-10 md:pt-12">
            <p className="text-2xl">
                autenticando <span>...</span>    
            </p>
        </div>
        <div className="flex flex-col pb-14">
            <h1 className="text-4xl md:text-6xl font-bold text-yellow-500">Cargando...</h1>
            <h3 className="text-lg md:text-xl lg:text-2xl font-semibold text-gray-500 dark:text-gray-200">
            por favor espere
            </h3>
        </div>
        <p>#jGuillénDev</p>
    </main>
}

const SplashViewMemo = React.memo((props:ISplashView)=>{
    return <SplashView location={props.location}/>
},function(prevProps, nextProps){
    const noReRender = prevProps.location === nextProps.location;
    return noReRender;
});

export default SplashViewMemo;
