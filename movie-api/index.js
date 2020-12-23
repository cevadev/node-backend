const express = require('express');

//exjecutamos express
const app = express();

//traemos nuestra configuracion
const { config } = require('./config/index.js');

//creamos las rutas de nuestra api

//cuando hacemos un request a la app imprimira un hello world
app.get('/', function (request, response) {
  //enviamos un respuesta al cliente
  response.send('Hello world');
});

//otra respuesta cuando se llame a la ruta /json
app.get('/json', function (request, response) {
  response.json({
    hello: 'world',
  });
});

//indicamos el puerto que debe escuchar la app
app.listen(config.port, () => {
  console.info(`El servidor esta corriendo en el puerto ${config.port}`);
});
