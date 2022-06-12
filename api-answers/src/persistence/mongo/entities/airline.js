const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const airlineSchema = new Schema({
    _id: false,
    id_airline:{
      type: Number,
      required:true
    },
    name:{
      type: String,
      required:true,
      trim: true,
    }
});

const airline = mongoose.model('airline', airlineSchema, 'airlines');
module.exports.Airline = airline;