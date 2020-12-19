const http = require("http");
const server = http.createServer();

// El servidor funciona con eventos
// request: lo que llegá del request
// response: lo que le vamos a responder al cliente
// El Objeto request es un RewriteString
// Los strings heredan de los event Evimetter -> es decir también tiene eventos
server.on("request", (request, response) => {
  if (request.method === "POST" && request.url == "/echo") {
    let body = [];
    //el objeto request es un writeable Stream y los Stream heredan de los Event Emiter, por lo tanto request tiene eventos
    //definimos el request cuando recibe el evento data y especificamos un callback que pone los datos en el body
    request
      .on("data", (chunk) => {
        body.push(chunk);
      }) // Caundo recibe nuestros datos, hay un evento end
      .on("end", () => {
        // Acá ya termino de recibir nuestros datos
        response.writeHead(200, { "Content-Type": "text-plain" });
        // En lugar de quemar la respuesta, responderemos con el cuerpo
        /* El string chunk tiene los datos de tipo buffer y lo que hay que hacer para que sea un string
          para que sea una cadena de texto en un string podemos usar la utilidad Buffer
        */
        body = Buffer.concat(body).toString();
        response.end(body);
      });
  } else {
    response.statusCode = 404;
    response.end();
  }
});

server.listen(9001);
console.log("Servidor en la url http://localhost:9001");

/**ejecutamos el archiv: node echo-server
 * abrimos postman, hacemos un peticiond e tipo POST al localhost:9001/echo
 * En el body, ingresamos un texto calquiera y click en send
 * debemos rcibir dicho texto como "eco" impreso en el body
 */
