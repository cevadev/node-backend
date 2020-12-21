//importamos el modulo de file system de node
const fs = require("fs");

const path = require("path");

//con el modulo fs podemos leer y crear un stream
const file = fs.createWriteStream(path.resolve(__dirname, "big"));

//recorremos nuestro texto y lo escribimos en el archivo big
for (let i = 0; i <= 1e6; i++) {
  file.write(
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam at sapien sodales, facilisis nulla sed, posuere nulla. Quisque pulvinar, neque quis maximus fringilla, nulla purus rhoncus quam, nec egestas risus magna at risus. Maecenas egestas magna nec ipsum elementum, eu tincidunt orci lacinia. Phasellus et dui mattis, sagittis turpis sed, aliquet risus. Duis consectetur leo nisi, quis eleifend lectus maximus fringilla. Donec ut elit nec diam dictum imperdiet sed eu massa. Integer at feugiat dui. Aliquam tincidunt ligula id enim consequat gravida. Aliquam accumsan libero id libero consectetur, in iaculis justo porta. Curabitur in justo egestas, dapibus massa a, lobortis odio. Quisque a convallis orci. Nullam tempor consequat dolor vitae venenatis. Sed ornare vestibulum libero ut laoreet. Integer quis dictum dolor. Cras ac finibus urna. Aliquam ac velit mattis, fringilla leo non, fermentum justo."
  );
}
file.end();
