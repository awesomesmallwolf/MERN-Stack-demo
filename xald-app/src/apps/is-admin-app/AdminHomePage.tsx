import {HeaderBar} from "../../shared/components/HeaderBar";
import { PageFooter } from "../../shared/components/PageFooter";

export const AdminHomePage = () => {
    return <main className="flex flex-col h-screen w-screen">
        <HeaderBar viewName="home"/>
        <HomeContent />
        <PageFooter title="haz las cosas con amor, simpre!"/>
    </main>
}

export const HomeContent = () => {
    return <section className="flex-1 flex flex-col items-center justify-center">
        <div className="text-center">
            <p className="text-2xl text-yellow-500 font-bold">Bienvenidos</p>
            <p className="text-xl font-light text-gray-500 dark:text-gray-300">seleccione el menu para empezar</p>
            <p className="text-sm mt-2 font-semibold text-gray-500">{process.env.REACT_APP_VERSION}</p>
        </div>
    </section>
}