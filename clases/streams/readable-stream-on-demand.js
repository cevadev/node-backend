const { Readable } = require("stream");

const readableStream = new Readable({
  /**
   * size-> es el tamaño del buffer de lectura, este se representa en bytes y el valor por defecto es 16kb
   * para un readablestream y para un file system (fs) es de 64kb
   */
  read(size) {
    setTimeout(() => {
      //si la letra esmayor que z
      if (this.chardCode > 90) {
        //finalizamos la lectura
        this.push(null);
        return;
      }
      //agregamos la letra al buffer y luego le sumamos 1
      this.push(String.fromCharCode(this.chardCode++));
    }, 100);
  },
});

//inicializamos el atributo chartcode y le asignamos el valor ascii de la letra A
readableStream.chardCode = 65;

//manejamos el stream lectura y le asignamos un stream de salida por pantall
readableStream.pipe(process.stdout);
