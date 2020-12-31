const sinon = require('sinon');

//importamos nuestros mocks y el mock que filtra las pelis esto para cuando se llame un test con los tags
//podemos simular que se filtro.
const { moviesMock, filteredMoviesMock } = require('./movies');

/**
 * creacion de stubs
 */
const getAllStub = sinon.stub();
//indicamos que cuando se llame con ciertos argumentos (withArgs) como movie que resuelva con los mocks de las peliculas
getAllStub.withArgs('movies').resolves(moviesMock);

//query que contiene el tag de Drama
const tagQuery = { tags: { $in: ['Drama'] } };
//indicamos que cuando llame con movies y con un query (tagQuery) nos resuelva devolviendo las peliculas con tag = Drama
getAllStub.withArgs('movies', tagQuery).resolves(filteredMoviesMock('Drama'));

//cuando llamamos a la funcionalidad create movie del servicio, resolvera devolviendo la primera pelicucla del mock, retorn el ID
const createStub = sinon.stub().resolves(moviesMock[0].id);

//hacemo un mock de la biblioteca de mongo
class MongoLibMock {
  getAll(collection, query) {
    return getAllStub(collection, query);
  }

  create(collection, data) {
    return createStub(collection, data);
  }
}

module.exports = {
  getAllStub,
  createStub,
  MongoLibMock,
};
