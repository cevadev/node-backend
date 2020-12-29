const express = require('express');

//exjecutamos express
const app = express();

//traemos nuestra configuracion
const { config } = require('./config/index.js');

//importamos nuestras rutas
const moviesApi = require('./routes/movies.js');

//importamos nuestro middleware para el manejo de errores
const {
  logErrors,
  errorHandler,
} = require('./utils/middleware/errorHandlers.js');

/**
 * Agregamos un middleware de Body parser express.json para cuando enviemos en nuestras rutas datos en formato json sepa como leerlo
 */
app.use(express.json());

//invocamos la funcion y pasamos nuestra app de express
moviesApi(app);

//usamos nuestros middleware de manejo de errors. Los middleware de error siempre deben ir al final de la ruta
app.use(logErrors);
app.use(errorHandler);

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
