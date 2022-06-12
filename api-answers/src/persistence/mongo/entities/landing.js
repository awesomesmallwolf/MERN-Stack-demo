const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const landingSchema = new Schema({
    _id: false,
    id_landing:{
      type: Number,
      required:true
    },
    description:{
      type:String,
      required:true
    }
});

const landing = mongoose.model('landing', landingSchema, 'landings');
module.exports.Landing = landing;