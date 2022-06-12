// @ts-nocheck
/* eslint-disable no-restricted-globals */
/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useLayoutEffect, useState, FC } from 'react';
import { createRoot } from 'react-dom/client';
import AppsRoot from './apps/AppsRoot';

const AppInitError = (error:any) => {
    return <div>
        <p>{error.message}</p>
    </div>
}

const AppStarting:FC = ({ children }) => {

    const [startingData, setStartingData] = useState({
        ready:false,
        error:''
    });

    useLayoutEffect(()=>{
        //si me da tiempo pondre una mini autenticacion del servidor
        //para obtener un token para la seguridad del api
        //y de la web
        setTimeout(function(){
            setStartingData({
                ready:true
            });
        },500);
    });
    
    return <React.Fragment>
        {
            startingData.ready === true
            ? children
            : <AppInitError />
        }
    </React.Fragment>
}

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
    <AppStarting>
        <AppsRoot />
    </AppStarting>
);
