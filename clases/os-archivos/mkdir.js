const fs = require("fs");

//con el parametro recursivo indicamos a node que si no existen los otros directorios que tambien los cree
//creamos la carpeta en el mismo directorio
fs.mkdir("mkdir/test/hello", { recursive: true }, (err) => {
  if (err) {
    throw new Error("Se ha producido un error");
  }
});
