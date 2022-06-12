var express = require('express');
const bodyParser = require('body-parser');
var router = express.Router();

const { createToken } = require("../../security/tokens");
const { encrypt, decrypt } = require("../../security/encrypts");
const { withBearerTokenMiddleware } = require("../../middlewares/is-auth");

const authActions = require('../../endpointActions/authActions');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

// a middleware function with no mount path. This code is executed for every request to the router
router.use(function (req, res, next) {
    console.log('Time:', Date.now());
    next();
})

router.post('/access', async (req, res) => {

    try {
        const method = req.body.pid 
            ? "authAdmin" 
            : req.body.password ? "authUser" : null;
        
        if(!method){
            res.status(400).json({
                message:"Bad Request"
            })
            return
        }
        
        const { message, type, error, code, account } = await authActions.authAdmin(req.body);
        if(error){
            res.status(code).json({
                message,type,error, code
            })
            return
        }

        const payload = encrypt({
            id:account.id,
            pid:account.pid
        }).toString()

        const token = createToken(payload);
        res.status(200).json({
            token
        })
    }
    catch(ex){
        res.status(500).json({
            error:ex,
            type:"Exception",
            message: ex.message || "Exception in server"
        })
    }
        
})

router.post('/secure/gen', async (req, res) => {
   
    try {
        const payload = encrypt("MiMamaMeMiMa").toString();
        const token = createToken(payload);
        res.status(200).json({
            token
        })
    }
    catch(ex){
        res.status(500).json({
            error:ex,
            type:"Exception",
            message: ex.message || "Exception in server"
        })
    }
})

router.post('/secure/test', withBearerTokenMiddleware, async (req, res) => {
   
    try {
        res.status(200).json({
            isAuth: req.isAuth,
            Auth:req.tokenAuth,
            data:req.tokenAuth.data,
            decypt: decrypt(req.tokenAuth.data).toString()
        })
    }
    catch(ex){
        res.status(500).json({
            error:ex,
            type:"Exception",
            message:"Exception in server"
        })
    }
})

module.exports.AuthRouter = router;