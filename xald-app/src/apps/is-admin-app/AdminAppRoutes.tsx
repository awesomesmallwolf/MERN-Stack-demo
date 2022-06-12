import { Route, Routes } from "react-router-dom";
import { AdminHomePage } from './AdminHomePage';
import { AnswersPage } from './answers/AnswersPage';
import { AirportsPage } from './airports/AirportsPage';

const AdminRoutes = () => {

    console.log("IN PRIVATE:ROUTES");
    
    return (
        <Routes>
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
