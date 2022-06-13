import { AnswerContent, AnswerData } from "../../../shared/components/AnswerContent";
import { ErrorCard } from "../../../shared/components/ErrorCard";
import { LoadingCard } from "../../../shared/components/LoadingCard";
import { useHttpRequest } from "../../../shared/hooks/useHttpRequest";
import { IRequest } from "../interfaces/interfaces";
import { config } from "../../../configuration/config";

export const useAnswerThree = (param: IRequest) => useHttpRequest<any, AnswerData>(param);

export const AnswersThree = () =>{

    const {isLoading, data, error} = useAnswerThree({
        url:`${config.apis.answers.url}/three`
    });

    return <div className="bg-gray-200 shadow-md py-3 px-3 rounded-md">
        <p className="text-sm text-gray-400">respuesta con menor número de vistas</p>
        {
            isLoading === false && data && 
            <AnswerContent data={data}/>
        }

        { isLoading && <LoadingCard /> }
        {
            isLoading === false && error && <ErrorCard error={error}/>
        }
    </div>
}
