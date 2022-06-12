const { fetchAsync } = require('../dataAccessLayer/answersDao');
require('./utils/logicUtils');

//1. Obtener el número de respuestas contestadas y no contestadas
const oneAsync = async (filter) => {
    const { data, status} =  await fetchAsync();
    console.log("answerLogic:status", status);
    console.log("answerLogic:data", data);
    const answered = data.items.filter(a => a.is_answered == true).length;
    const notAnswered = data.items.filter(a => a.is_answered == false).length;
    return {
        answered,
        notAnswered
    }
}

//2. Obtener la respuesta con mayor reputación
const twoAsync = async (filter) => {
    const { data, status} =  await fetchAsync();
    console.log("answerLogic:status", status);
    console.log("answerLogic:data", data);
    let betterReputationCounter = 0;
    let betterReputation;

    //haciendo esto con pseudocodigo, usar slice, reduce u otros no son tan rapidos
    //si estas usando javascript
    for(var i=0; i<data.items.length; i++){
        const item = data.items[i];
        if(item && item.owner && item.owner.reputation){
            if(item.owner.reputation >= betterReputationCounter){
                betterReputationCounter = item.owner.reputation;
                betterReputation = item;
            }
        }
    }
    return betterReputation;
}

//3. Obtener la respuesta con menor número de vista
const threeAsync = async (filter) => {
    const { data, status} =  await fetchAsync();
    console.log("answerLogic:status", status);
    console.log("answerLogic:data", data);
    let lowerViewCounter;
    let lowerViewCount;

    //haciendo esto con pseudocodigo, usar slice, reduce u otros no son tan rapidos
    //si estas usando javascript
    for(var i=0; i<data.items.length; i++){
        const item = data.items[i];
        
        //checamos si no esta inicializado
        if(!lowerViewCounter){
            lowerViewCounter = item.view_count;
        }
        if(item && item.view_count){
            if(item.view_count <= lowerViewCounter){
                lowerViewCounter = item.view_count;
                lowerViewCount = item;
            }
            
        }
    }
    return lowerViewCount;
}

//4. Obtener la respuesta más vieja y más actual
const fourAsync = async (filter) => {
    const { data, status} =  await fetchAsync();
    console.log("answerLogic:status", status);
    console.log("answerLogic:data", data);
    const oldest = data.items.reduce((prev, curr) => {
        if(prev && prev.creation_date){
            return new Date(curr.creation_date) > new Date(prev.creation_date) ? prev : curr;
        } else {
            return curr;
        }
    });
    const newest = data.items.reduce((prev, curr) => {
        if(prev && prev.creation_date){
            return new Date(curr.creation_date) > new Date(prev.creation_date) ? curr : prev;
        } else {
            return curr;
        }
    });
    return {
        oldest,
        newest
    }
}

module.exports.oneAsync = oneAsync;
module.exports.twoAsync = twoAsync;
module.exports.threeAsync = threeAsync;
module.exports.fourAsync = fourAsync;