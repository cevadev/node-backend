//const boom = require('@hapi/boom');

const { config } = require('../../config');

//funcionalidad de ayuda
function withErrorStack(error, stack) {
  //si estamos en modo dev retornamos el error y el stack
  if (config.dev) {
    return { error, stack };
  }
  //de lo contrario retornamos el error
  return error;
}

//middleware que nos permite imprimir los errores
function logErrors(err, req, res, next) {
  console.log(err);
  //llamamos al siguiente middleware de error
  next(err);
}

function wrapErrors(err, req, res, next) {
  if (!err.isBoom) {
    next(boom.badImplementation(err));
  }

  next(err);
}

//middleware que nos permite manejar el error
function errorHandler(err, req, res, next) {
  // eslint-disable-line
  /* const {
    output: { statusCode, payload },
  } = err; */
  //establecemos el status del error
  res.status(err.status || 500);
  //a la funcionalidad withErrorStack le pasamos el mensaje de error y stack y lo retornamos en formato json
  res.json(withErrorStack(err.message, err.stack));
}

module.exports = {
  //exportamos los middleware
  logErrors,
  wrapErrors,
  errorHandler,
};
