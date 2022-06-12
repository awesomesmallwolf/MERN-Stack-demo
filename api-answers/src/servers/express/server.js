var express = require('express');
const path = require('path');
const { withBearerTokenMiddleware } = require('../../middlewares/is-auth');

var app = express();
app.set('view engine', 'pug');
app.use(require("body-parser").text());
app.use((req, res, next)=>{

  res.setHeader('Access-Control-Allow-Origin','*');
  res.setHeader('Access-Control-Allow-Methods','POST,GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers','Authorization,Content-Type');

  if(req.method === "OPTIONS")
    return res.sendStatus(200);
  
  next();
  
});

//si queremos proteger la api tan solo
//registramos el uso del middleware de auth
//app.use(withBearerTokenMiddleware);

module.exports.ExpressApp = app;