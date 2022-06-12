const mongoose = require('mongoose');
const { Airline } = require('./mongo/entities/airline');
const {
    airlines
} = require('./initialData');

const drop = async (collectionName) => {
    return new Promise((resolve, reject)=>{
        mongoose.connection.dropCollection(collectionName, function(err) {
            /* show messages */
            if ( err ) {
                if (err.code === 26)  
                console.log('--' + collectionName + ' collection does not exists');
                else throw err;
            }
            else {
                console.log('--' + collectionName +' collection dropped');
            }
        });
    });
}

const dropCollections = async () =>{
    await drop('landing');
    await drop('flight');
    await drop('airport');
    await drop('airline');
}

const initializeData = () => {
    Airline.create( airlines, function (err, users) {
        if ( err ) throw err;
        console.log( users + '\n-- airlines inserted successfully' );
    });
}

module.exports.dropCollections = dropCollections;
module.exports.initializeData = initializeData;