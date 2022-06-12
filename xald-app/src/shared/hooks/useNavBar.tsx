import React, { useState } from "react";

export const useNavBar = () =>{
    const [current, setCurrent] = useState<string>("home");
    return {
        current,
        setCurrent
    }
}