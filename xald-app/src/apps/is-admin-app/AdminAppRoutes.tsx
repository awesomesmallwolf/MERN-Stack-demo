import { Route, Routes, useLocation } from "react-router-dom";
import { AdminHomePage } from './AdminHomePage';
import { AnswersPage } from './answers/AnswersPage';
import { AirportsPage } from './airports/AirportsPage';

const AdminRoutes = () => {

    let location = useLocation();
    let state = location.state as { backgroundLocation?: Location };
    console.log("location.state: ", location.state);
    console.log("IN PRIVATE:ROUTES");
    
    return (
        <Routes  location={state?.backgroundLocation || location}>
            <Route path="/" element={<AdminHomePage/>} />
            <Route path="/answers" element={<AnswersPage/>} />
            <Route path="/airports" element={<AirportsPage/>} />
            <Route path="*" element={<NotFoundPage />}/>
        </Routes>
    );
}


export const NotFoundPage = () =>{
    return <div>
        <h1>Admin page not found</h1>
    </div>
}

export default AdminRoutes;
