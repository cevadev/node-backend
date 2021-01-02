const { config } = require('../config');

//la funcionalidad se va a ejecutar solo si no estamos en modo desarrollo
function cacheResponse(res, seconds) {
  if (!config.dev) {
    //establecemos un header
    res.set('Cache-Control', `public, max-age=${seconds}`);
  }
}

module.exports = cacheResponse;
