
'use strict';

//OBTIENES DEPENDENCIAS NECESARIAS PARA EJECUTAR TODO LO QUE HACE ESTE ARCHIVO
require('dotenv').config();
const express = require('express');
const path = require('path');
const {registryMetrics} = require('./server-metrics');


//CREAS UNA APP DE EXPRESS
const app = express();
// DEFINES UN PUERTO
const port = process.env.PORT || 5000;

const { InitMongoDb } = require("./persistence/mongo/base/mongoRoot");
InitMongoDb(process.env.DB_CONN_STRING);
// ## USANDO NUESTRO SERVER DE EXPRESS
//Usando Express
const { ExpressApp } = require('./servers/express/server');

ExpressApp.use(express.static(path.join(__dirname, 'public')));
ExpressApp.get('/', (req, res) => {
  res.sendFile(path.join(__dirname+'/public/index.html'));
}); 

// Metrics endpoint
ExpressApp.get('/metrics', async (req, res) => {
  res.set('Content-Type', client.register.contentType)
  const metrics = await registryMetrics();
  res.end(metrics);
})

const { SwaggerRouter } = require('./routers/SwaggerRouter');
//Extendiendo el backend
//Aqui el backquend o las funcionalidades se extienden agregando los routers
const { AnswersRouter } = require('./routers/AnswersRouter');
const { AirportsRouter } = require('./routers/AirportsRouter');

//agregando Swagger api routes
ExpressApp.use('/api/docs', SwaggerRouter);
//agregando Answers api routes
ExpressApp.use('/api/answers', AnswersRouter);
//agregando Airports api routes
ExpressApp.use('/api/airports', AirportsRouter);

const server = ExpressApp.listen(port, () => {
    console.log(`server-api listening on port ${port}!`);
    console.log('Press Ctrl+C to quit.');
  })
  
  process.on('SIGTERM', () => {

    server.close((err) => {
      if (err) {
        console.error(err)
        process.exit(1)
      }
  
      process.exit(0)
    })
  })