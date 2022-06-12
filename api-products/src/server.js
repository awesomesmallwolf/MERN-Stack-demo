
'use strict';

//OBTIENES DEPENDENCIAS NECESARIAS PARA EJECUTAR TODO LO QUE HACE ESTE ARCHIVO
const express = require('express');
const client = require('prom-client');

//CREAS UNA APP DE EXPRESS
const app = express();

// DEFINES UN PUERTO
const port = process.env.PORT || 5000;

//ARREGLO DE DATOS (FAKE-DUMMY)
const products = [{
    id:'54f6d4s65',
    name: 'fideos',
    price: 99.90
}];

//  ### METRICAS DE PROMETHEUS ###

//CREA UN NUEVO REGISTRY 
const registry = new client.Registry();

//CREA UNA METRICA DE TIPO COUNTER
const counter = new client.Counter({
  name: 'aggregated_products',
  help: 'The total de productos agregados',
  labelNames: ['product_add']
});

//CREA OTRA METICA DE TIPO COUNTER
const apiCallsCounter = new client.Counter({
    name: 'api_calls',
    help: 'Total de peticiones a la api'
});

//REGISTRA METRICA EN EL REGISTRY
registry.registerMetric(apiCallsCounter); 

//REGISTRA METRICA EN EL REGISTRY
registry.registerMetric(counter);

//ESTABLECE DEFAULT LABELS
registry.setDefaultLabels({
    app: 'api-products'
});

//DEFINIR QUE REGISTRY VA A RECOLECTAR LAS METRICAS
client.collectDefaultMetrics({
    register: registry
});

//  ###  PETICIONES DISPONIBLES DE LA API ###

//ESTO ES UNA PETICION HTTP GET EN EL ROOT
app.get('/', function (req, res) {
    apiCallsCounter.inc();
    res.send('Tooly Fans Products API');
})

//ESTO ES UNA PETICION HTTP GET
app.get('/list', function (req, res) {

    //HACIENDO ALGO DENTRO DE ESTA PETICION
    const result = {
        pagination: {
            currentPage:0,
            pageSize:20,
            nextPage:2,
        },
        items: products,
        count: products.length,
    }
    res.status(200).send(result);
})

//ESTO ES UNA PETICION HTTP POST
app.post('/add', function (req, res) {

    const productAdd = req.body;
    console.log("adding new product");
    counter.inc({
        product_add: productAdd
    });
    res.send({
        id: new Date().getTime(),
        message:"add succesfully"
    })
})

// Metrics endpoint
app.get('/metrics', async (req, res) => {
    res.set('Content-Type', client.register.contentType)
    const metrics = await client.register.metrics()
    res.end(metrics);
})

//app.listen(3001)
const server = app.listen(port, () => {
    console.log(`tooly-fans products-api listening on port ${port}!`)
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