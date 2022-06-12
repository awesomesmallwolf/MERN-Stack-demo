import React from "react";
import { Counter } from "./Counter";

type Owner = {
    reputation:number;
    display_name:string;
    profile_image:string;
}

export type AnswerData = {
    title:string;
    question_id:number;
    score:number;
    owner: Owner;
    view_count:number;
}

export interface IAnswerContent {
    data: AnswerData
    className?: string;
}

export const AnswerContent = ({data, className}:IAnswerContent) =>{

    return <div className={className}>
    <div className="flex flex-row py-2 space-x-2 justify-start">
        <img className="h-16 w-16 object-cover rounded-md border-2 border-yellow-500" src={data.owner.profile_image} alt="user"/>
        <div className="flex-1">
            <p className="text-yellow-500 text-xl font-bold">{data.owner.display_name}</p>
            <p className="text-gray-500">reputation: <span className="text-green-700 font-bold">{data.owner.reputation}</span></p>
            <p className="text-gray-500">id: <span className="text-green-600 font-bold">{data.question_id}</span></p>
        </div>
        <div className="">
        <Counter title="score" number={data.score}/>
        </div>
    </div>
    <p className="text-2xl text-gray-800 font-bold">{data.title}</p>
    <p className="text-gray-500">views: <span className="text-green-600 font-bold">{data.view_count}</span></p>
  </div>
}