/* ------ Con el modulo OS podemos acceder a todo el sistema operativo ------ */

const os = require("os");

//Me devuelve la arquitectura de mi OS
console.log(os.arch());

//Me dice en qué plataforma estoy
console.log(os.platform());

//podemos acceder a la información de las cpus de mi pc.
//Si añades .length podrás saber el numero de hilos
console.table(os.cpus());

//  Voy a saber el hostname de la máquina
console.log(os.hostname());

// Puedo acceder a mi interfaz de red activas en mi máquina, puedo saber  IPVX
console.log(os.networkInterfaces());

//Me muestra los directorios temporales, temporales una imagen que voy a procesar
console.log(os.tmpdir());

//Me permite saber cual es el directorio raíz
console.log(os.homedir());

//Me muestran todos los errores de sistema.
console.log(os.constants);

/* Acceder a espacios de memoria es muy útil para saber 
si tengo a memoria suficiente para realizar esta operación. */

const SIZE = 1024;

//Me dice en bytes la memoria libre que tenemos
console.log(os.freemem());
console.log("Memoria en kb" + kb(os.freemem()));
console.log("Memoria en mb" + mb(os.freemem()));
console.log("Memoria en gb" + gb(os.freemem()));

//Me muestra la memoria disponible del pc.
console.log(gb(os.totalmem()));

function kb(bytes) {
  return bytes / SIZE;
}
function mb(bytes) {
  return kb(bytes) / SIZE;
}
function gb(bytes) {
  return mb(bytes) / SIZE;
}
