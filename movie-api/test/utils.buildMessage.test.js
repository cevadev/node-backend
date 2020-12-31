const assert = require('assert');
//incluimos la utilidad buildMessage que se le aplicara el TDD
const buildMessage = require('../utils/buildMessage');

/**
 * Definimos el TEST TDD donde cuando enviemos cierto mensaje obtendremos cierta respuesta
 * con .only hacemo que solamente se ejecute esta suite de test
 */
describe.only('utils - buildMessage', function () {
  //callback que se llama cuando recibimos una entidad y una accion
  describe('when receives an entity and an action', function () {
    //cuando se llama este callback debe retornar el mensaje de movie created
    it('should return the respective message', function () {
      //llamamos a buildMessage que debe construir el mensaje movie created
      const result = buildMessage('movie', 'create');
      const expect = 'movie created';
      assert.strictEqual(result, expect);
    });
  });

  describe('when receives an entity and an action and is a list', function () {
    it('should return the respective message with the entity in plural', function () {
      const result = buildMessage('movie', 'list');
      const expected = 'movies listed';
      assert.strictEqual(result, expected);
    });
  });
});
