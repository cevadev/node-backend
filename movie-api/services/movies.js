/**
 * Capa de servicios desde la cual proveemos la coleccion de movies
 */
const MongoLib = require('../lib/mongo.js');

//const { moviesMock } = require('../utils/mocks/movies.js');

class MovieService {
  constructor() {
    //definimos dos atributos
    this.collection = 'movies';
    this.mongoDB = new MongoLib();
  }

  //obtenemos el listado de peliculas
  async getMovies({ tags }) {
    //si existen tags entonces construimos el query, los tags que estan dentro de los tags que estamos pasando
    const query = tags && { tags: { $in: tags } };
    //el query contiene los tags que nos permitiran filtrar peliculas por tags
    const movies = await this.mongoDB.getAll(this.collection, query);
    //retornamos las movies o si viene vacio, retornamos un array vacio
    return movies || [];
  }

  //obtenemos una pelicula de la coleccion
  async getMovie({ movieId }) {
    const movie = await this.mongoDB.get(this.collection, movieId);
    //retornamos la pelicula o si viene vacion, retornamos un objeto vacio
    return movie || {};
  }

  //creamos una nueva pelicula
  async createMovie({ movie }) {
    const createMovieId = await this.mongoDB.create(this.collection, movie);
    return createMovieId;
  }

  //actualizamos los datos de una pelicula
  async updateMovie({ movieId, movie } = {}) {
    const updateMovieId = await this.mongoDB.create(
      this.collection,
      movieId,
      movie
    );
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
