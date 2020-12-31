const assert = require('assert');
//proxyquerie para requerir o llamar al servicio y reemplazar la biblioteca de mongo por nuestro mongo mock lib
const proxyquire = require('proxyquire');
//importamos las utilidades del mongoLib
const { MongoLibMock, getAllStub } = require('../utils/mocks/mongoLib.js');
//importamos la lista de peliculas mock
const { moviesMock } = require('../utils/mocks/movies');

/**
 * Describimos nuestros test: services - movies
 * callback->
 */
describe('services - movies', function () {
  //llamamos al servicio movies mediante proxyrequire
  const MoviesServices = proxyquire('../services/movies', {
    //reemplazamos nuestra biblioteca de mongo por el mock para hacer prueba del servicio
    '../lib/mongo': MongoLibMock,
  });

  //creamos una instancia del servicio y utilizamos nuestro mongoLibMock
  const moviesService = new MoviesServices();

  /**
   * Describimos nuestro test:
   * Cuando se llame al metodo getMovies, el callback es async ya que el servicio tiene async y await
   */
  describe('when getMovies method is called', async function () {
    //1er caso: comprobamos si el metodo getMovies() efectivamente se llama del MongoLibMock
    it('should call the getall MongoLib method', async function () {
      //callback donde verficiamos que efectivamente se haya realizado la llamda, llamamos al getMovies()
      await moviesService.getMovies({});
      //debe ser estrictamente igualq ue el getAllStub fue llamado
      assert.strictEqual(getAllStub.called, true);
    });

    //2do caso: Comprobamos que efectivamente retorne la coleccion de peliculas
    it('should return an array of movies', async function () {
      //obtenemos el resultado del array con las peliculas
      const result = await moviesService.getMovies({});
      //expected va a ser igual a nuestro mock de pelicuas
      const expected = moviesMock;
      //comparamos que result sea estrictamente igual a expected
      assert.deepStrictEqual(result, expected);
    });
  });
});
