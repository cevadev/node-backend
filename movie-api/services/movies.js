/**
 * Capa de servicios desde la cual proveemos el Mock de movies
 */
const { moviesMock } = require('../utils/mocks/movies.js');

class MovieService {
  //obtenemos el listado de peliculas
  async getMovies() {
    const movies = await Promise.resolve(moviesMock);
    //retornamos las movies o si viene vacio, retornamos un array vacio
    return movies || [];
  }

  //obtenemos una pelicula de la coleccion
  async getMovie() {
    const movie = await Promise.resolve(moviesMock[0]);
    //retornamos la pelicula o si viene vacion, retornamos un objeto vacio
    return movie || {};
  }

  //creamos una nueva pelicula
  async createMovie() {
    const createMovieId = await Promise.resolve(moviesMock[0].id);
    return createMovieId;
  }

  //actualizamos los datos de una pelicula
  async updateMovie() {
    const updateMovieId = await Promise.resolve(moviesMock[0].id);
    return updateMovieId;
  }

  //actualizacion parcial de una pelicula
  async partialUpdateMovie() {
    const updateMovieId = await Promise.resolve(moviesMock[0].id);
    return updateMovieId;
  }

  //eliminamos una pelicula
  async deleteMovie() {
    const deletedMovieId = await Promise.resolve(moviesMock[0].id);
    return deletedMovieId;
  }
}

module.exports = MovieService;
