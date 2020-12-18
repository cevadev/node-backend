/**
 * Lo que requiere async await es que nuestra función devuelva una promesa,
 * que es como una serie de wrapper que hacemos, en esté caso nosotros vamos a convertir esa promesa en una función:
 * Retornamos una funcion que devuelve una promesa
 */
const promiseFunction = () =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() < 0.5) {
        resolve("Hola mundo");
      } else {
        reject(new Error("Hello Error"));
      }
    }, 2000);
  });

async function asyncAwait() {
  //envolvemos en un try/catch
  try {
    const msg = await promiseFunction();
    console.log("message", msg);
  } catch (error) {
    console.log("error", error);
  }
}

asyncAwait();
