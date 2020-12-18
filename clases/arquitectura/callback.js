/**Ejemplo de Arquitectura orientada a eventos en Nodejs */

const asyncCallback = function (callback) {
  setTimeout(() => {
    if (Math.random() < 0.5) {
      // Concepto Error First Callback:
      return callback(null, "Hola mundo");
    } else {
      callback(new Error("Hello Error"), null);
    }
  }, 2000);
};

asyncCallback((err, msg) => {
  // Verificar si existe el error
  if (err) {
    console.log("Error", err);
  } else {
    console.log("mensage", msg);
  }
});
