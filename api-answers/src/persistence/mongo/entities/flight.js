const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const flightSchema = new Schema({
    _id: false,
    id_airline:{
        type: Number,
        required: true
    },
    id_airport:{
        type: Number,
        required: true
    },
    id_landing:{
        type: Number,
        required: true
    },
    day: {
        type:String,
        required:true
    }
});

const flight = mongoose.model('flight', flightSchema, 'flights');
module.exports.Flight = flight;