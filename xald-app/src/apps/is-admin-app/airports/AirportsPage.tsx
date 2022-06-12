import { HeaderBar } from "../../../shared/components/HeaderBar";
import { PageTitle } from "../../../shared/components/PageTitle";
import { AirportsFour } from "./AirportsFour";
import { AirportsOne } from "./AirportsOne";
import { AirportsThree } from "./AirportsThree";
import { AirportsTwo } from "./AirportsTwo";

export const AirportsPage = () => {
    return <main className="flex flex-col h-screen w-screen">
        <HeaderBar viewName="airports"/>
        <PageTitle title="airports"/>
        <AirportsContent />
    </main>
}

export const AirportsContent = () => {
    return <section className="flex-1 flex flex-wrap gap-4 content-start justify-center">
        <AirportsOne />
        <AirportsTwo />
        <AirportsThree />
        <AirportsFour />
    </section>
}