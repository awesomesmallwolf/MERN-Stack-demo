const { oneAsync, twoAsync, threeAsync, fourAsync } = require('../applicationLogic/answersLogic');

const actionOne = async (args, context, info)=>{
    // Obtener el número de respuestas contestadas y no contestadas    
    console.log(args, context, info);
    const result = await oneAsync();
    console.log("logic:result ", result);
    return {
        data: result,
        error: false,
    };
}

const actionTwo = async (args, context, info)=>{
    // Obtener la respuesta con mayor reputación
  
    console.log(args, context, info);
    const result = await twoAsync();
    console.log("logic:result ", result);
    return {
        data: result,
        error: false,
    };
}

const actionThree = async (args, context, info)=>{
    // Obtener la respuesta con menor número de vistas
    console.log(args, context, info);
    const result = await threeAsync();
    console.log("logic:result ", result);
    return {
        data: result,
        error: false,
    };
}

const actionFour = async (args, context, info)=>{
    // Obtener la respuesta más vieja y más actual
    console.log(args, context, info);
    const result = await fourAsync();
    console.log("logic:result ", result);
    return {
        data: result,
        error: false,
    };
}

module.exports.actionOne = actionOne;
module.exports.actionTwo = actionTwo;
module.exports.actionThree = actionThree;
module.exports.actionFour = actionFour;