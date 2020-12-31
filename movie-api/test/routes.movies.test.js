/**
 * Test donde hacemos pruebas de las rutas o endpoints de nuestra app
 */

const assert = require('assert');

//con proxyquire cada vez que hacemos un require podemos elegir que en lugar de traer un paquete real que traiga un mock
const proxyquire = require('proxyquire');

const { moviesMock, MovieServiceMock } = require('../utils/mocks/movies.js');
const testServer = require('../utils/middleware/testServer.js');

describe('routes - movies', function () {
  //intervenimos la ruta de las movies con proxyquire
  const route = proxyquire('../routes/movies', {
    //el archivo que nos llega de routes que es routes/movies.js tiene una depencia al servicio MovieService pero nosotros
    //queremos llamar al mock del MovieService, por eso indicamos que la ruta ../services/movies llame al MoviesServiceMock
    '../services/movies': MovieServiceMock,
  });

  //pasamos a testServer la ruta
  const request = testServer(route);

  /**
   * Una vez establecida nuestra route que el proxyquire va nterceptar y el service mock que vamos a testear
   * podemos describir nuestro test como se muestra abajo
   */
  describe('GET /movies', function () {
    /**
     * esto se lee: GET /movies deberia responder con un status 200
     * pasamos un callback donde indicamos cuando finaliza el test
     */
    it('should respond with status 200', function (done) {
      //hacemos nuestro assert
      request.get('/api/movies').expect(200, done);
    });

    //Test -> nos responde con la lista de peliculas
    //done sirve para que el test sepa cuando finalizo
    it('should respond with the list of movies', function (done) {
      //request.get -> hacemos la peticion / en lugar de usar expect, finalizamos la peticion con .end()
      //.end() -> tiene un callback que recibe un error first, response y dentro llamamos al assert
      request.get('/api/movies').end((err, res) => {
        /**
         * assert -> exactamente igual, corroboramos la respuesta del body que trae las movies con lo que hay en:
         * data: moviesMock y message
         */
        assert.deepStrictEqual(res.body, {
          data: moviesMock,
          //este mensaje debe coincidir con el mensaje que escribimos en routes/movies.js router.get(/)
          message: 'movies listed',
        });
        //indicamos que el test finaliza aqui para evitar el timeout
        done();
      });
    });
  });
});
