const { Transform } = require("stream");

const transformStream = new Transform({
  //en el transform tenemos las propiedad del write pero tambien las funciones del read
  transform(chunk, encoding, callback) {
    //el stream que recibe hacemos push
    this.push(chunk.toString().toUpperCase());
    //llamamos al callback para indicar que ya finalizo
    callback();
  },
});

//leemos el proceso desde la entrada de la terminal y el resultado lo pasamos al procees.stdout en mayusculas
process.stdin.pipe(transformStream).pipe(process.stdout);
