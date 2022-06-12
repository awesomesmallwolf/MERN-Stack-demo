const client = require('prom-client');

//  ### METRICAS DE PROMETHEUS ###

//CREA UN NUEVO REGISTRY 
const registry = new client.Registry();

//CREA UNA METRICA DE TIPO COUNTER
const counter = new client.Counter({
    name: 'all_answers',
    help: 'The total de preguntas encontradas',
    labelNames: ['total_answers']
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
    app: 'api-answers'
});

//DEFINIR QUE REGISTRY VA A RECOLECTAR LAS METRICAS
client.collectDefaultMetrics({
    register: registry
});

module.exports.prometheus = {
    registryMetrics: async function() {
        return client.register.metrics();
    },
    apiCallsCounter: apiCallsCounter
};