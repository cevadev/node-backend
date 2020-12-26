const express = require('express');

//exjecutamos express
const app = express();

//traemos nuestra configuracion
const { config } = require('./config/index.js');

//importamos nuestras rutas
const moviesApi = require('./routes/movies.js');

/**
 * Agregamos un middleware de Body parser express.json para cuando enviemos en nuestras rutas datos en formato json sepa como leerlo
 */
app.use(express.json());

//invocamos la funcion y pasamos nuestra app de express
moviesApi(app);

//indicamos el puerto que debe escuchar la app
app.listen(config.port, () => {
  console.info(`El servidor esta corriendo en el puerto ${config.port}`);
});

/**
 * //cuando hacemos un request a la app imprimira un hello world
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
 */
