//la clase Duplex implementa la interface Readable y Writable stream
const { read } = require("fs");
const { Duplex } = require("stream");

const duplexStream = new Duplex({
  //metodo de la interface Writable
  write(chunk, encoding, callback) {
    console.info(chunk.toString());
    //escribimos la informacion
    callback();
  },

  //meotodo de la interface Readable
  read(size) {
    if (this.currentCharCode > 90) {
      //superior a la letra z, dejamos de leer el stream
      this.push(null);
      //dejamos de ejecutar el codigo
      return;
    }
    this.push(String.fromCharCode(this.currentCharCode++));
  },
});

duplexStream.currentCharCode = 65;
process.stdin.pipe(duplexStream).pipe(process.stdout);
