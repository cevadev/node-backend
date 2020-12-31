const express = require('express');

//exjecutamos express
const app = express();

//traemos nuestra configuracion
const { config } = require('./config/index.js');

//importamos nuestras rutas
const moviesApi = require('./routes/movies.js');

//llamamos el middleware que habilita CORS
const cors = require('cors');

//DEBUG
const debug = require('debug')('app:server');

//importamos nuestro middleware para el manejo de errores
const {
  logErrors,
  errorHandler,
  wrapErrors,
} = require('./utils/middleware/errorHandlers.js');

const notFoundHandler = require('./utils/middleware/notFoundHandler.js');

/**
 * Agregamos un middleware de Body parser express.json para cuando enviemos en nuestras rutas datos en formato json sepa como leerlo
 */
app.use(express.json());

//habilitamos CORS para todos los request
app.use(cors());

//invocamos la funcion (routes) y pasamos nuestra app de express
moviesApi(app);
//capturamos el error 404 si existiese
app.use(notFoundHandler);

//usamos nuestros middleware de manejo de errors. Los middleware de error siempre deben ir al final de la ruta
app.use(logErrors);
app.use(wrapErrors);
app.use(errorHandler);

//indicamos el puerto que debe escuchar la app
app.listen(config.port, () => {
  debug(`El servidor esta corriendo en el puerto ${config.port}`);
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
