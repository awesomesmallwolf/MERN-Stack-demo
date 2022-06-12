
const jwt = require('jsonwebtoken');
const { security } = require("../configurations");

const dateAddDays = function(date, dd){
    return new Date(date + (24*60*60*1000*dd))
}

const createToken = ( payload )=>{
  
  const notBeforeDate = dateAddDays( Date.now(), 1 );
  const token = jwt.sign({
    exp: Math.floor(Date.now() / 1000) + (60 * 60), //1 hour
    nbf: notBeforeDate.getSeconds(),//NotBefore
    data: payload
  }, security.privateKey, { algorithm: 'RS256'});

  return token;
}

const verifyToken = (token) =>{
    return jwt.verify(token, security.publicKey, { algorithm:'RS256'});
}

const checkTokenAsync = (token) =>{

  return new Promise((resolve, reject)=>{
    jwt.verify(token, security.privateKey, { algorithms: ['RS256'] }, function(err, decoded){
      if(err){
        reject({
          expired: err.name === "TokenExpiredError",
          withError: err.name === "JsonWebTokenError",
          notActive: err.name === "NotBeforeError",
          error:err
        })
      }
      resolve(decoded);
    })
  });

}

module.exports.createToken = createToken;
module.exports.verifyToken = verifyToken;
module.exports.checkTokenAsync = checkTokenAsync;