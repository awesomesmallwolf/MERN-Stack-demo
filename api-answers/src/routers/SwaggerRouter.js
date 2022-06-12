var express = require('express');
var router = express.Router();
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');

//SWAGGER OPTIONS
const options = {
    definition: {
        openapi:'3.0.0',
        info:{
            title:'xaldigital api',
            version:'1.0.0'
        }
    },
    // files containing annotations as above
    apis:[
        './src/routers/AnswersRouter.js',
        './src/routers/AirportsRouter.js'
    ],
}
const openapiSpecification = swaggerJsdoc(options);

router.use("/swagger", swaggerUI.serve);
router.get("/swagger", swaggerUI.setup(openapiSpecification));
//docs in json

router.get('/swagger.json', (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.status(200).send(openapiSpecification);
})

module.exports.SwaggerRouter = router;
