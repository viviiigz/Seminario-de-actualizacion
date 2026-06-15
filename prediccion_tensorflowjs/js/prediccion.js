// ===========================================================
// prediccion.js
// este archivo se encarga de la parte de "prediccion":
//   - lee los valores de x que escribe el usuario
//   - le pide al modelo ya entrenado que calcule la y
//   - muestra los resultados en pantalla
// ===========================================================


// -----------------------------------------------------------
// funcion: predecir_valores
// se ejecuta cuando el usuario hace click en el boton "predecir"
// -----------------------------------------------------------
function predecir_valores() {

    // si la variable "modelo" todavia no fue creada (no se entreno
    // todavia), se avisa y se corta la funcion con "return"
    if (!modelo) {
        actualizar_estado('primero hay que entrenar el modelo');
        return;
    }

    // se lee el texto que el usuario escribio en el input
    const texto_entrada = document.getElementById('input-x').value;

    // se procesa el texto en varios pasos, uno por uno:
    const valores_x = texto_entrada
        .split(',')                          // separa el texto por comas -> arreglo de strings
        .map(valor => Number(valor.trim()))  // quita espacios y convierte cada texto en numero
        .filter(valor => !isNaN(valor));     // descarta los valores que no son numeros validos

    // si despues de filtrar no quedo ningun valor valido,
    // se avisa al usuario y se corta la funcion
    if (valores_x.length === 0) {
        actualizar_estado('ingresa al menos un valor numerico valido');
        return;
    }

    // se convierte el arreglo de numeros en un tensor, igual que
    // se hizo con los datos de entrenamiento
    const tensor_entrada = tf.tensor2d(valores_x, [valores_x.length, 1]);

    // modelo.predict() usa los pesos ya entrenados para calcular
    // una prediccion de "y" para cada valor de "x"
    const tensor_salida = modelo.predict(tensor_entrada);

    // dataSync() toma los resultados del tensor y los convierte
    // en un arreglo normal de javascript, para poder usarlos facil
    const predicciones = tensor_salida.dataSync();

    // se muestran los resultados en la pantalla
    mostrar_resultados(valores_x, predicciones);

    // se liberan los tensores que ya no se van a usar mas
    tensor_entrada.dispose();
    tensor_salida.dispose();
}


// -----------------------------------------------------------
// funcion: mostrar_resultados
// arma la lista de resultados "x -> y" y la muestra en el html
// -----------------------------------------------------------
function mostrar_resultados(valores_x, predicciones) {

    // se busca el contenedor donde van a aparecer los resultados
    const contenedor = document.getElementById('resultados');

    // se limpia lo que hubiera antes y se pone un titulo
    contenedor.innerHTML = '<h3>resultados:</h3>';

    // se crea una lista <ul> vacia, donde se va a ir agregando
    // un <li> por cada par x -> y
    const lista = document.createElement('ul');

    // forEach recorre cada valor de x junto con su indice
    valores_x.forEach((x, indice) => {

        // se crea un elemento de lista <li>
        const item = document.createElement('li');

        // toFixed(2) deja solo 2 decimales en el resultado
        item.textContent = `para x = ${x}: y = ${predicciones[indice].toFixed(2)}`;

        // se agrega el <li> dentro de la lista <ul>
        lista.appendChild(item);
    });

    // finalmente, se agrega la lista completa dentro del contenedor
    contenedor.appendChild(lista);
}
