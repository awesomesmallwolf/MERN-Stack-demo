import { AnswerContent, AnswerData } from "../../../shared/components/AnswerContent";
import { ErrorCard } from "../../../shared/components/ErrorCard";
import { LoadingCard } from "../../../shared/components/LoadingCard";
import { useHttpRequest } from "../../../shared/hooks/useHttpRequest";
import { IRequest } from "../interfaces/interfaces";
import { config } from "../../../configuration/config";

export const useAnswerTwo = (param: IRequest) => useHttpRequest<any, AnswerData>(param);

export const AnswersTwo = () =>{

    const {isLoading, data, error} = useAnswerTwo({
        url:`${config.apis.answers.url}/two`
    });

    return <div className="bg-gray-200 shadow-md py-3 px-3 rounded-md">
        <p className="text-sm text-gray-400">la respuesta con la mayor reputacion</p>
        {
            isLoading === false && data
            ? <AnswerContent data={data}/> 
            : <LoadingCard />
        }

        {
            isLoading === false && error && <ErrorCard error={error}/>
        }
    </div>
}
