var express = require('express');
const bodyParser = require('body-parser');
var router = express.Router();
const {initialize, actionOne, actionTwo, actionThree, actionFour } = require('../applicationLayer/airportActions');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

// middleware para hacer algo, por ejemplo usar el helper de prometheus
// contar cuantas veces hacen llamadas a esta api de answers
router.use(function (req, res, next) {
    console.log('Time:', Date.now());
    next();
})

//end request middleware
router.use(( err, req, res, next ) => {
    res.on('finish', function() {
        console.log("RESPONSE: ", res);
        trace("RESPONSE");
        trace(res);
    });
})

/** 
 * @openapi
 * /api/airports:
 *   get:
*      description: response if airports api is available
*      responses:
*        200:
*          description: Success
*/
router.get('/', (req, res) => {
    res.status(200).json({
        available:true,
        msg:"welcome to airports api"});
})

router.get('/initialize', async (req, res) => {
    try {
        const {error, message, data} = await initialize();
        res.status(200).json(data);
    }
    catch(err){
        console.error(err);
        res.status(500).json({
            error:err,
            type:"Exception",
            message:"Exception in server"
        })
    }
});

router.get('/one', async (req, res) => {
    try {
        const {error, message, data} = await actionOne();
        res.status(200).json(data);
    }
    catch(err){
        console.error(err);
        res.status(500).json({
            error:err,
            type:"Exception",
            message:"Exception in server"
        })
    }
});

router.get('/two', async (req, res) => {
    try {
        const {error, message, data} = await actionTwo();
        res.status(200).json(data);
    }
    catch(err){
        console.error(err);
        res.status(500).json({
            error:err,
            type:"Exception",
            message:"Exception in server"
        })
    }
});

router.get('/three', async (req, res) => {
    try {
        const {error, message, data} = await actionThree();
        res.status(200).json(data);
    }
    catch(err){
        console.error(err);
        res.status(500).json({
            error:err,
            type:"Exception",
            message:"Exception in server"
        })
    }
});

router.get('/four', async (req, res) => {
    try {
        const {error, message, data} = await actionFour();
        res.status(200).json(data);
    }
    catch(err){
        console.error(err);
        res.status(500).json({
            error:err,
            type:"Exception",
            message:"Exception in server"
        })
    }
});

module.exports.AirportsRouter = router;