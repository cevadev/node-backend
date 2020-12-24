/**archivo donde manejamos las rutas de las películas */
const express = require('express');

//archivo de mocks
const { moviesMock } = require('../utils/mocks/movies.js');

/**
 * funcion que recibe una application de express, esto nos permite ser dinamicos y tener el control sobre
 * que applicaction va a consumir nuestra ruta
 */
function moviesApi(app) {
  //creamos nuestra ruta
  const router = express.Router();
  app.use('/api/movies', router);

  /* nos va a devolver las salidas, como estamos escribiendo código asincrono debemos usar la palabra
   clave async, recuerden que una ruta recibe el request, el response object y en este caso vamos a 
   recibir la funcionalidad next, esto hace parte de la teoria de middleware que vamos a explicar 
   más adelante
    */
  router.get('/', async function (req, res, next) {
    // como es código asincron es muy importante utilizar el try catch
    try {
      // es importante que como nuestro codigo es un array debemos envolverlo
      // en una promesa para que puedamos hacer uso de nuestro código asincrono con la palabra await
      const movies = await Promise.resolve(moviesMock);

      // Usamos response, definimos el estatus, que como hablamos con anterioridad va a ser 200 de ok
      // definimos su estructura json
      res.status(200).json({
        data: movies,
        message: 'movies listend',
      });
    } catch (error) {
      next(error);
    }
  });

  //IMPLEMENTADO LAS OTRAS RUTAS DEL API

  //RUTA: /api/movie/:movieId
  router.get('/:movieId', async function (req, res, next) {
    try {
      //devolemos la 1era pelicula del mock (solo de prueba)
      const movie = await Promise.resolve(moviesMock[0]);
      res.status(200).json({
        data: movie,
        message: 'movie fetched',
      });
    } catch (error) {
      next(error);
    }
  });

  //RUTA Creación de una pelicula: /api/movie
  router.post('/', async function (req, res, next) {
    try {
      const createMovieId = await Promise.resolve(moviesMock[0].id);
      //codigo de status 201 para creacion
      res.status(201).json({
        data: createMovieId,
        message: 'the movie was created',
      });
    } catch (error) {
      next(error);
    }
  });

  //RUTA Actualizacion de una pelicula:  /api/movie/:id
  router.put('/:movieId', async function (req, res, next) {
    try {
      //obtenemos el id de la pelicula actualizada
      const updatedMovieId = await Promise.resolve(moviesMock[0].id);
      res.status(200).json({
        data: updatedMovieId,
        message: `The movie ${updatedMovieId} was updated`,
      });
    } catch (error) {
      next(error);
    }
  });

  //RUTA Eliminacion de una pelicula: /api/movie/:id
  router.delete('/:movieId', async function (req, res, next) {
    try {
      //obtenemos el id de la pelicula actualizada
      const deletedMovieId = await Promise.resolve(moviesMock[0].id);
      res.status(200).json({
        data: deletedMovieId,
        message: `The movie ${deletedMovieId} was deleted`,
      });
    } catch (error) {
      next(error);
    }
  });
}

module.exports = moviesApi;
