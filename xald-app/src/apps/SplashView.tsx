import { motion } from "framer-motion";
import React from "react";

interface ISplashView {
    location:string;
}


const SplashView = (props:ISplashView) => {

    console.log("splash:rendering:location: ", props.location);
    return <main className="h-screen flex flex-col px-8 py-3">

        <div className="grow flex items-start justify-start pt-10 md:pt-12">
            <p className="text-2xl md:txt-3xl">
                autenticando <span>...</span>    
            </p>
        </div>
        <div className="flex flex-col pb-14">
            <motion.h1 className="text-4xl md:text-6xl font-bold text-yellow-500"
            initial={{ x: -50, opacity: 0.20}}
            animate={{ x: 0, opacity: 1 }}
            transition={{ x: { type: "spring" }, default: { delay: 0.5, duration: 0.25 }}}>
                Cargando...
            </motion.h1>
            <motion.h3 className="text-lg md:text-xl lg:text-2xl font-semibold text-gray-500 dark:text-gray-200 pt-1"
            initial={{ x: -50, opacity: 0.20}}
            animate={{ x: 0, opacity: 1 }}
            transition={{ x: { type: "spring" }, default: { delay: 1.0, duration: 0.25 }}}>
            por favor espere
            </motion.h3>
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
