/**archivo donde manejamos las rutas de las películas */
const express = require('express');

const joi = require('joi');

//importamos la capa de servicios
const MovieService = require('../services/movies.js');

//importamos los schemas de validacion
const {
  movieIdSchema,
  createMovieSchema,
  updateMovieSchema,
} = require('../utils/schemas/movie.js');

//importamos el validationHandler para pasarle un schema e indicamos de donde va a sacar los datos
const validationHandler = require('../utils/middleware/validationHandler.js');

/**
 * funcion que recibe una application de express, esto nos permite ser dinamicos y tener el control sobre
 * que applicaction va a consumir nuestra ruta
 */
function moviesApi(app) {
  //creamos nuestra ruta
  const router = express.Router();
  app.use('/api/movies', router);

  //instanciamos la capa de servicios
  const movieServices = new MovieService();

  /* nos va a devolver las salidas, como estamos escribiendo código asincrono debemos usar la palabra
   clave async, recuerden que una ruta recibe el request, el response object y en este caso vamos a 
   recibir la funcionalidad next, esto hace parte de la teoria de middleware que vamos a explicar 
   más adelante
    */
  router.get('/', async function (req, res, next) {
    //los tags de las movies viene del query de la url antes el signo de ? (/api/movies/?tags=)
    const { tags } = req.query;

    // como es código asincron es muy importante utilizar el try catch
    try {
      // es importante que como nuestro codigo es un array debemos envolverlo
      const movies = await movieServices.getMovies({
        //filtramos las movies por unos tags
        tags,
      });
      //producimos un error para testear el middleware de errores
      //throw new Error('Error getting movies');

      // Usamos response, definimos el estatus, que como hablamos con anterioridad va a ser 200 de ok
      // definimos su estructura json
      res.status(200).json({
        data: movies,
        message: 'movies listed',
      });
    } catch (error) {
      next(error);
    }
  });

  //IMPLEMENTADO LAS OTRAS RUTAS DEL API

  //RUTA: /api/movie/:movieId
  /**
   * el validationHandler por defecto saca los datos a validar del body pero vamos a sacar u obtener el movieId de los params
   * el parametro movieId va a tener un schema de movieIdSchema e indicamos que lo obtenemos de los params
   * el middleware validationHandler lo ubicamos entre la ruta '/:movieId' y la funcion async
   */
  router.get(
    '/:movieId',
    validationHandler(joi.object({ movieId: movieIdSchema }), 'params'),
    async function (req, res, next) {
      //el movieId viene como parametro en la url (/api/movies/:movieId)
      const { movieId } = req.params;

      try {
        //devolemos la 1era pelicula del mock (solo de prueba)
        const movie = await movieServices.getMovie({ movieId });
        res.status(200).json({
          data: movie,
          message: 'movie fetched',
        });
      } catch (error) {
        next(error);
      }
    }
  );

  //RUTA Creación de una pelicula: /api/movie
  //validationHandler -> va a utilizar el createMovieSchema y lo obtendra del body, como es por defecto donde lo bsuca no lo indicamos
  //validmaos primero el movieId que viene en los params y luego la pelicula que viene en el body
  router.post(
    '/',
    validationHandler(createMovieSchema),
    async function (req, res, next) {
      //el objeto movie lo obtenemos del body. al body le ponemos un alista llamado movie
      const { body: movie } = req;

      try {
        const createMovieId = await movieServices.createMovie({ movie });
        //codigo de status 201 para creacion
        res.status(201).json({
          data: createMovieId,
          message: 'the movie was created',
        });
      } catch (error) {
        next(error);
      }
    }
  );

  //RUTA Actualizacion de una pelicula:  /api/movie/:id
  router.put(
    '/:movieId',
    validationHandler(joi.object({ movieId: movieIdSchema }), 'params'),
    validationHandler(updateMovieSchema),
    async function (req, res, next) {
      //el objeto movie lo obtenemos del body. al body le ponemos un alista llamado movie
      const { body: movie } = req;

      const { movieId } = req.params;

      try {
        //obtenemos el id de la pelicula actualizada
        const updatedMovieId = await movieServices.updateMovie({
          movieId,
          movie,
        });
        res.status(200).json({
          data: updatedMovieId,
          message: `The movie ${updatedMovieId} was updated`,
        });
      } catch (error) {
        next(error);
      }
    }
  );

  //RUTA actualizacion parcial de una pelicula /api/movies/:movieId
  router.patch('/:movieId', async function (req, res, next) {
    const { movieId } = req.params;
    const { body: movie } = req;
    try {
      const updatedMovieId = await movieServices.partialUpdateMovie({
        movieId,
        movie,
      });
      res.status(200).json({
        data: updatedMovieId,
        message: 'movie updated partially',
      });
    } catch (error) {
      next(error);
    }
  });

  //RUTA Eliminacion de una pelicula: /api/movie/:id
  router.delete(
    '/:movieId',
    validationHandler(joi.object({ movieId: movieIdSchema }), 'params'),
    async function (req, res, next) {
      const { movieId } = req.params;

      try {
        //obtenemos el id de la pelicula actualizada
        const deletedMovieId = await movieServices.deleteMovie({ movieId });
        res.status(200).json({
          data: deletedMovieId,
          message: `The movie ${deletedMovieId} was deleted`,
        });
      } catch (error) {
        next(error);
      }
    }
  );
}

module.exports = moviesApi;
