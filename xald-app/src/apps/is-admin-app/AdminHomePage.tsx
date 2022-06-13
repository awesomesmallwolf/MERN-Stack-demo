import { motion } from "framer-motion";
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
        <motion.div className="text-center"
        initial={{ y: 50, opacity: 0.20}}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1, y: { type: "spring" }, default: { duration: 0.25 }}}>
            <p className="text-2xl text-yellow-500 font-bold">Bienvenidos</p>
            <p className="text-xl font-light text-gray-500 dark:text-gray-300">seleccione el menu para empezar</p>
            <p className="text-sm mt-2 font-semibold text-gray-500">{process.env.REACT_APP_VERSION}</p>
        </motion.div>
    </section>
}