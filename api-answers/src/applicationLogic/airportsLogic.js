const { countGroupsBy, groupBy } = require('./utils/logicUtils');
const { initAirlinesAsync } = require('../dataAccessLayer/airportsDao');
const {Airport} = require('../persistence/mongo/entities/airport');
const {Flight} = require('../persistence/mongo/entities/flight');

const initalizeAsync = async () => {
    const result =  await initAirlinesAsync();
    return {
        data:result
    }
}

// https://studio3t.com/knowledge-base/articles/mongodb-aggregation-framework/
const oneAsync = async () => {
    //aeropuerto con mayor movimiento durante el año
    const result = await Flight.aggregate([
        { $group : { 
                _id : '$id_airport', 
                airport_flights : { $sum : 1 },
            } 
        },
        { $sort: { airport_flights: 1 } },
        // { $max: { airport_flights: 1, } }, no soportado por mi version de mongo cluster :'(
        { $lookup: {
            from: "airports",
            localField: "_id",
            foreignField: "id_airport",
            as: "airport"
        }},
        {
            $unwind: '$airport'
        },
        { $project: { _id:0, id:"$_id" , name: "$airport.name", flights:"$airport_flights" }},
    ]);
    console.log("AIRPORTS:LOGIC:ONE-ASYNC:RESULT: ", result);

    //como mi version del cluster de mongo no soporta $max
    //obtendremos los maximos a manita
    const total_values = result.map(airport => airport.flights);
    const max_value = Math.max.apply(null, total_values);
    const max_airports = result.filter(airport => airport.flights === max_value);

    return {
        data: max_airports
    }
}

const twoAsync = async () => {
    //aerolinea con mayor movimiento durante el año
    const result = await Flight.aggregate([
        { $group : { 
                _id : '$id_airline', 
                airline_flights : { $sum : 1 },
            } 
        },
        { $sort: { airline_flights: 1 } },
        // { $max: { airline_flights: 1, } }, no soportado por mi version de mongo cluster :'(
        { $lookup: {
            from: "airlines",
            localField: "_id",
            foreignField: "id_airline",
            as: "airline"
        }},
        {
            $unwind: '$airline'
        },
        { $project: { _id:0, id:"$_id" , name: "$airline.name", flights:"$airline_flights" }},
    ]);
    console.log("AIRLINES:LOGIC:TWO-ASYNC:RESULT: ", result);

    //como mi version del cluster de mongo no soporta $max
    //obtendremos los maximos a manita
    const total_values = result.map(airline => airline.flights);
    const max_value = Math.max.apply(null, total_values);
    const max_airlines = result.filter(airline => airline.flights === max_value);

    return {
        data: max_airlines
    }
}

const threeAsync = async () => {
    //en que dia se ha tenido el mayor numero de vuelos

    // usar $accumulator puede no ser soportado por algunos tipos de clusters de mongo :'(
    // MongoServerError: $accumulator not allowed in this atlas tier
    // lo dejare comentado arriba, pero intentare otra cosa...
    // documentacion: https://www.mongodb.com/docs/manual/reference/operator/aggregation/accumulator/
    // const result = await Flight.aggregate([
    //     {   $group : { 
    //             _id : '$_id',
    //             avgDays: {
    //                 $accumulator: {
    //                     init: function(){
    //                         return { count: 0};
    //                     }
    //                 },
    //                 accumulate: function(state, value){
    //                     return {
    //                         count: state.count + 1
    //                     }
    //                 },
    //                 accumulateArgs: ["$day"],
    //                 merge: function(state1, state2){
    //                     return {
    //                         count: state1.count + state2.count
    //                     }
    //                 },
    //                 finalize:function(state){
    //                     return state;
    //                 },
    //                 lang: "js"
    //             }
    //         } 
    //     },
    // ]);

    //como mi version del cluster de mongo no soporta $accumulator
    //intentando otra cosa :'(
    const result = await Flight.aggregate([
        { $project: { _id:0, day:1 }},
    ]);
    console.log("DAYS:LOGIC:THREE-ASYNC:RESULT: ", result);

    //como mi version del cluster de mongo no soporta $max
    //obtendremos los maximos a manita
    const groupedCounts = countGroupsBy(result, item => item.day);
    console.log("GROUPED_count: ", groupedCounts);

    const total_values = groupedCounts.map(item => item.count);
    const max_value = Math.max.apply(null, total_values);
    const max_day = groupedCounts.filter(item => item.count === max_value);

    return {
        data: max_day
    }
}

const fourAsync = async () => {
    //aerolineas con más de 2 vuelos por día
    const result = await Flight.aggregate([
        {   $group : { 
                _id : {
                    id_airline:'$id_airline',
                    day: '$day'
                }, 
                airline_flights : { $sum : 1 },
            } 
        },
        { $sort: { airline_flights: 1 } },
        { $lookup: {
            from: "airlines",
            localField: "_id.id_airline",
            foreignField: "id_airline",
            as: "airline"
        }},
        {
            $unwind: '$airline'
        },
        { $project: { _id:0, id:"$_id.id_airline", day:"$_id.day", name: "$airline.name", flights:"$airline_flights" }},
    ]);
    console.log("AIRLINES:LOGIC:FOUR-ASYNC:RESULT: ", result);

    //agrupando los datos por nombre de aerolinea
    groupedCounts = groupBy(result, item => item.name);
    console.log("groupedCounts: ", groupedCounts);

    //obteniendo las aerolineas que tienen mas de 2 vuelos
    let airlines = [];
    for (const [key, value] of groupedCounts.entries()) {
        console.log(key, value);
        //evaluar si tiene mas de 2 vuelos
        const haveTwoFlights = value.find(v => v.flights >= 2);
        if(haveTwoFlights){
            airlines.push({
                id: haveTwoFlights.id,
                name: haveTwoFlights.name,
                flights: haveTwoFlights.flights
            });
        }
    }

    return {
        data: airlines
    }
}

module.exports.initalizeAsync = initalizeAsync;
module.exports.oneAsync = oneAsync;
module.exports.twoAsync = twoAsync;
module.exports.threeAsync = threeAsync;
module.exports.fourAsync = fourAsync;