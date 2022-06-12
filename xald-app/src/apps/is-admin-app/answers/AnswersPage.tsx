import { HeaderBar } from "../../../shared/components/HeaderBar";
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
    </main>
}

export const AnswersContent = () => {
    return <section className="flex-1 flex flex-wrap gap-4 content-start justify-center">
        <AnswersOne />
        <AnswersTwo />
        <AnswersThree />
        <AnswersFour />
    </section>
}