import {Suspense, useState, useLayoutEffect} from 'react';
import { BrowserRouter } from "react-router-dom";
import { RecoilRoot } from 'recoil';
import AdminRoutes from './is-admin-app/AdminAppRoutes';
import PublicRoutes from './is-public-app/PublicAppRoutes';
// https://reactrouter.com/docs/en/v6
import SplashView from './SplashView';


const AppsRoutes = ()=> {

    const [ authState, setAuthState] = useState({
        isAuth:false,
        checked:false,
    });

    useLayoutEffect(()=>{
        //simulando que se checa la autenticacion
        setTimeout(function(){
            setAuthState({
                isAuth:true,
                checked:true,
            });
        },1500);
    });


    if(!authState.checked)
    return <SplashView location="appRoutes.tsx"/>
    else if (authState.isAuth)
    return <AdminRoutes/>
    else
    return <PublicRoutes />
}

const AppsRoot = () => {
    return (
        <RecoilRoot>
            <Suspense fallback={<SplashView location="logedInRoutes:fallback"/>}>
                <BrowserRouter>
                    <AppsRoutes/>
                </BrowserRouter>
            </Suspense>
        </RecoilRoot>
    )
}
  
export default AppsRoot;

  