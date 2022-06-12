
const prepare = (o) => {
    o._id = o._id.toString();
    return o
};

const fixID = (o) => {
    o = o.toObject();
    if(o._id)
        o.id = o._id.toString();
    delete o._id;
    return o
}

const toJson = (o) => {
    o = o.toObject();
    if(o._id)
        o.id = o._id.toString();
    delete o._id;
    o = o.toJson();
    return o
}

  
const mapDocs = (docs) => docs.map((doc)=>fixID(doc));
const mapJSON = (docs) => docs.map((doc)=>toJson(doc));
const mapArgs = (args, document) => {
    Object.keys(args).forEach(function(propertyName, index){
        if(propertyName !== "id" || propertyName !== "_id")
            document[propertyName] = args[propertyName];
    });
    return document;
};
module.exports.prepare = prepare;
module.exports.fixID = fixID;
module.exports.mapDocs = mapDocs;
module.exports.mapJSON = mapJSON;
module.exports.mapArgs = mapArgs;