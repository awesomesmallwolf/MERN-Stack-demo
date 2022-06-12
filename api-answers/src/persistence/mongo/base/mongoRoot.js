var mongoose = require('mongoose');

const connectionStrings = {
    SmartDealer:{
        Main:`mongodb+srv://dev_user:4R4qYC0ISSgzUe2R@cluster0.za99y.mongodb.net/sn_main?retryWrites=true&w=majority`,
        Products:`mongodb+srv://dev_user:4R4qYC0ISSgzUe2R@cluster0.za99y.mongodb.net/sn_products?retryWrites=true&w=majority`,
        Services:`mongodb+srv://dev_user:4R4qYC0ISSgzUe2R@cluster0.za99y.mongodb.net/sn_services?retryWrites=true&w=majority`
    }
}

const InitMongoDb = function(connectionString){

    mongoose.connection.on('open', e => {
        console.log("mongoose:open:error:",e);
    });
    mongoose.connection.on('connecting', e => {
        console.log("mongoose:connecting:error:",e);
    });
    mongoose.connection.on('connected', e => {
        console.log("mongoose:connected:error:",e);
    });
    mongoose.connection.on('error', err => {
        console.log("mongoose:connection:error:",err);
    });

    const options = { 
        useNewUrlParser: true,
        useUnifiedTopology:true 
    }
    mongoose.connect(connectionString, options, function(err){
        console.log("mongoose.connect.err: ", err);
    }) 

}

const InitMongoDbAsync = async (connectionString, ca) =>{
    mongoose.connection.on('open', e => {
        console.log("mongoose:open:error:",e);
    });
    mongoose.connection.on('connecting', e => {
        console.log("mongoose:connecting:error:",e);
    });
    mongoose.connection.on('connected', e => {
        console.log("mongoose:connected:error:",e);
    });
    mongoose.connection.on('error', err => {
        console.log("mongoose:connection:error:",err);
    });

    const options = { 
        useNewUrlParser: true,
        useUnifiedTopology:true 
    }
    return await mongoose.connect(connectionString, options);
}

module.exports.InitMongoDb = InitMongoDb;
module.exports.InitMongoDbAsync = InitMongoDbAsync;
