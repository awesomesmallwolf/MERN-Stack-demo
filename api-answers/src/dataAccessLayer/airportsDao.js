const { Airline } = require('../persistence/mongo/entities/airline');
const { Airport } = require('../persistence/mongo/entities/airport');
const { Landing } = require('../persistence/mongo/entities/landing');
const { Flight } = require('../persistence/mongo/entities/flight');

const airlines = [
    { id_airline:1, name:"Volaris"},
    { id_airline:2, name:"Aeromar"},
    { id_airline:3, name:"Interjet"},
    { id_airline:4, name:"Aeromexico"},
]

const airports = [
    { id_airport:1, name:"Benito Juarez"},
    { id_airport:2, name:"Guanajuato"},
    { id_airport:3, name:"La Paz"},
    { id_airport:4, name:"Oaxaca"},
]

const landings = [
    { id_landing:1, description:"Salida"},
    { id_landing:2, description:"Llegada"},
]

const flights = [
    { id_airline:1, id_airport:1, id_landing:1, day:"2021-05-02"},
    { id_airline:2, id_airport:1, id_landing:1, day:"2021-05-02"},
    { id_airline:3, id_airport:2, id_landing:2, day:"2021-05-02"},
    { id_airline:4, id_airport:3, id_landing:2, day:"2021-05-02"},
    { id_airline:1, id_airport:3, id_landing:2, day:"2021-05-02"},
    { id_airline:2, id_airport:1, id_landing:1, day:"2021-05-02"},
    { id_airline:2, id_airport:3, id_landing:1, day:"2021-05-04"},
    { id_airline:3, id_airport:4, id_landing:1, day:"2021-05-04"},
    { id_airline:3, id_airport:4, id_landing:1, day:"2021-05-04"},
]

const initAirlinesAsync = async () =>{

    await Airline.deleteMany();
    await Airport.deleteMany();
    await Landing.deleteMany();
    await Flight.deleteMany();

    const a = await Airline.insertMany(airlines);
    const b = await Airport.insertMany(airports);
    const c = await Landing.insertMany(landings);
    const d = await Flight.insertMany(flights);

    return {
        version: new Date().getTime().toString(),
        airlines:a,
        airports:b,
        landings:c,
        flights:d
    }
}

module.exports.initAirlinesAsync = initAirlinesAsync;