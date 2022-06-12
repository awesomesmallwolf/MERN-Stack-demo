import React from "react";

export interface ICounter {
    title:string;
    number:number;
}


export const Counter = ({title, number}:ICounter) =>{
    return <div className="text-center">
        <div className="flex flex-col items-center justify-center">
            <p className="text-yellow-500 text-5xl font-bold">{number}</p>
        </div>
        <p className="text-gray-600 text-base font-semibold">{title}</p>
    </div>
}