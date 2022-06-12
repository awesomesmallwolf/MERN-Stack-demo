const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const airportSchema = new Schema({
  _id: false,
  id_airport:{
    type: Number,
    required:true
  },
  name:{
    type:String,
    required:true
  }
});

const airport = mongoose.model('airport', airportSchema, 'airports');
module.exports.Airport = airport;