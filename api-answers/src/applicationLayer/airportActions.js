const { initalizeAsync, oneAsync, twoAsync, threeAsync, fourAsync } = require('../applicationLogic/airportsLogic');

const initialize = async (args, context, info)=>{
    // Cargar datos iniciales en la base de datos  
    console.log(args, context, info);
    const { data } = await initalizeAsync();
    console.log("logic:result ", data);
    return {
        data: data,
        error: false,
    };
}

const actionOne = async (args, context, info)=>{
    // Aeropuertos que han tenido mayor movimiento durante el año
    console.log(args, context, info);
    const { data } = await oneAsync();
    console.log("logic:result ", data);
    return {
        data: data,
        error: false,
    };
}

const actionTwo = async (args, context, info)=>{
    // Aerolineas que hay tenido mayor movimiento durante el año
    console.log(args, context, info);
    const { data } = await twoAsync();
    console.log("logic:result ", data);
    return {
        data: data,
        error: false,
    };
}

const actionThree = async (args, context, info)=>{
    // En que dia se ha tenido mayor numer de vuelos
    console.log(args, context, info);
    const { data } = await threeAsync();
    console.log("logic:result ", data);
    return {
        data: data,
        error: false,
    };
}

const actionFour = async (args, context, info)=>{
    // Aerolineas con más de 2 vuelos por día
    console.log(args, context, info);
    const { data } = await fourAsync();
    console.log("logic:result ", data);
    return {
        data: data,
        error: false,
    };
}

module.exports.initialize = initialize;
module.exports.actionOne = actionOne;
module.exports.actionTwo = actionTwo;
module.exports.actionThree = actionThree;
module.exports.actionFour = actionFour;