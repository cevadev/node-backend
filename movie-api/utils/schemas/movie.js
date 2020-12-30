/**
 * creamos un schema que valide la estructura de las peliculas
 */
//joi nos ayuda a especificar los schemas
const joi = require('joi');

//regex que representa la estructura de mongodb
const movieIdSchema = joi.string().regex(/^[0-9a-fA-F]{24}$/);
const movieTitleSchema = joi.string().max(80);
const movieYearSchema = joi.number().min(1888).max(2077);
const movieCoverSchema = joi.string().uri();
const movieDescriptionSchema = joi.string().max(300);
const movieDurationSchema = joi.number().min(1).max(300);
const movieContentRatingSchema = joi.string().max(5);
const movieSourceSchema = joi.string().uri();
//los tags es un array, y especificamos tamien cada item del array tag
const movieTagsSchema = joi.array().items(joi.string().max(50));

//schema para crear una pelicula, es decir, especificamos la estructura de una nueva pelicula
const createMovieSchema = joi.object({
  //con required especificamos que si enviamos un pelicula estos atriutos son requeridos
  //es importanto que el key (title, year, cover, etc) sea exactamente que vamos a enviar en el request de lo contrario
  //no lo va a identificar
  title: movieTitleSchema.required(),
  year: movieYearSchema.required(),
  cover: movieCoverSchema.required(),
  description: movieDescriptionSchema.required(),
  duration: movieDurationSchema.required(),
  contentRating: movieContentRatingSchema.required(),
  source: movieSourceSchema.required(),
  tags: movieTagsSchema,
});

//schema donde especificamos que cambios de una pelicula se deben actualizar.
const updateMovieSchema = joi.object({
  title: movieTitleSchema,
  year: movieYearSchema,
  cover: movieCoverSchema,
  description: movieDescriptionSchema,
  duration: movieDurationSchema,
  contentRating: movieContentRatingSchema,
  source: movieSourceSchema,
  tags: movieTagsSchema,
});

module.exports = {
  //exportamos el id de la pelicula
  movieIdSchema,
  createMovieSchema,
  updateMovieSchema,
};
