import { HeaderBar } from "../../../shared/components/HeaderBar";
import { PageFooter } from "../../../shared/components/PageFooter";
import { PageTitle } from "../../../shared/components/PageTitle";
import { AnswersFour } from "./AnswersFour";
import { AnswersOne } from "./AnswersOne";
import { AnswersThree } from "./AnswersThree";
import { AnswersTwo } from "./AnswersTwo";

export const AnswersPage = () => {
    return <main className="flex flex-col h-screen w-screen">
        <HeaderBar viewName="answers"/>
        <PageTitle title="Answers"/>
        <AnswersContent />
        <PageFooter title="haz las cosas con amor, simpre!"/>
    </main>
}

export const AnswersContent = () => {
    return <section className="px-2 md:px-4 flex-1 flex flex-wrap gap-4 content-start justify-center">
        <AnswersOne />
        <AnswersTwo />
        <AnswersThree />
        <AnswersFour />
    </section>
}