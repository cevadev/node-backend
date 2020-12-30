const boom = require('@hapi/boom');

//const joi = require('joi');
/* 
function validate(data, schema) {
  //obtenemos el error en el caso que el schema no sea válido con la data
  const { error } = joi.object(schema).validate(data);
  return error;
} */

function validationHandler(schema, data = 'body') {
  return async (req, res, next) => {
    try {
      await schema.validateAsync(req[data]);
      next();
    } catch (err) {
      next(boom.badRequest(err));
    }
  };
}

/* function validationHandler(schema, check = 'body') {
  return function (req, res, next) {
    //determinamos si validate retorna un error
    const error = validate(req[check], schema);

    //si existe un error, no retorna un boom error que no indican que los datos no son validos
    error ? next(boom.badRequest) : next();
  };
} */

module.exports = validationHandler;
