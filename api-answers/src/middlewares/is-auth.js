const { verifyToken, checkTokenAsync } = require("../security/tokens");

const withBearerTokenMiddleware = async (req, res, next)=>{

    const authHeader = req.get('Authorization');
    if(!authHeader){
        res.status(401).send({ 
            message: 'Token Not Found' 
        })
        return
    }

    const token = authHeader.split(' ')[1]; //Bearer jfeoiljoir
    if(!token ||  token === ''){
        res.status(401).send({ 
            message: 'Token is not valid' 
        })
        return
    }
    
    let decodedToken;
    try {
      decodedToken = await checkTokenAsync(token).catch(err=>{
        console.log("CHECK:TOKEN:ERROR: ", err);
      })
    }
    catch(ex){
        res.status(401).send({ 
            message: 'Token is not valid' 
        })
        return
    }

    if(!decodedToken){
        res.status(401).send({ 
            message: 'Token is not valid' 
        })
        return
    }

    req.isAuth = true;
    req.tokenAuth = decodedToken;
    next();
}

module.exports.withBearerTokenMiddleware = withBearerTokenMiddleware;