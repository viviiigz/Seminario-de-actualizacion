// ===========================================================
// modelo.js
// este archivo es el corazon de la actividad.
// se encarga de:
//   1) crear el modelo secuencial
//   2) entrenarlo con los datos de datos.js
//   3) capturar el valor de "loss" en cada epoca con onEpochEnd
//   4) guardar esos valores en un arreglo (historial_perdida)
// ===========================================================

// variable global que va a guardar el modelo una vez creado.
// se declara con "let" (sin valor todavia) para poder usarla
// desde otros archivos, como prediccion.js
let modelo;

// arreglo global donde se van a ir guardando los valores de
// perdida (loss) de cada epoca. arranca vacio y se llena
// durante el entrenamiento. grafico.js lee este arreglo
// para dibujar la curva.
let historial_perdida = [];


// -----------------------------------------------------------
// funcion: crear_modelo
// crea y configura un modelo secuencial simple (regresion lineal)
// -----------------------------------------------------------
function crear_modelo() {

    // tf.sequential() crea un modelo vacio, al que despues
    // se le van agregando capas una arriba de la otra
    const modelo_nuevo = tf.sequential();

    // se agrega una capa "dense" (densa / fully connected)
    // - units: 1        -> la capa tiene 1 sola neurona de salida
    // - inputShape: [1] -> cada dato de entrada es un solo numero (x)
    modelo_nuevo.add(tf.layers.dense({ units: 1, inputShape: [1] }));

    // compile() prepara el modelo para poder entrenarlo
    // - optimizer: algoritmo que ajusta los pesos en cada epoca
    //   tf.train.adam(0.05) -> adam con una velocidad de aprendizaje de 0.05
    // - loss: 'meanSquaredError' -> mide el error como el promedio
    //   de (valor_real - valor_predicho) al cuadrado
    modelo_nuevo.compile({
        optimizer: tf.train.adam(0.05),
        loss: 'meanSquaredError'
    });

    // se devuelve el modelo ya armado y listo para entrenar
    return modelo_nuevo;
}


// -----------------------------------------------------------
// funcion: entrenar_modelo
// entrena el modelo con los datos y va guardando la perdida
// de cada epoca usando el callback onEpochEnd
// -----------------------------------------------------------
async function entrenar_modelo() {

    // cada vez que se entrena de nuevo, se vacia el historial
    // anterior para empezar una grafica limpia
    historial_perdida = [];

    // se crea un modelo nuevo (con pesos al azar) llamando a crear_modelo
    modelo = crear_modelo();

    // tf.tensor2d convierte un arreglo normal de javascript en un
    // "tensor", que es el formato de datos que entiende tensorflow.js
    // el segundo parametro [filas, columnas] indica la forma del tensor:
    // aca tenemos varias filas y 1 sola columna (1 valor por dato)
    const tensor_x = tf.tensor2d(datos_x, [datos_x.length, 1]);
    const tensor_y = tf.tensor2d(datos_y, [datos_y.length, 1]);

    // se avisa al usuario, a traves del texto de estado, que
    // empezo el entrenamiento (funcion definida en app.js)
    actualizar_estado('entrenando modelo, por favor espera...');

    // modelo.fit() entrena el modelo con los datos.
    // es una funcion asincrona, por eso usamos "await": el codigo
    // espera a que termine el entrenamiento antes de seguir.
    await modelo.fit(tensor_x, tensor_y, {

        // epochs: 100 -> el modelo va a recorrer todos los datos 100 veces
        epochs: 100,

        callbacks: {
            // onEpochEnd se ejecuta automaticamente cada vez que
            // termina una epoca de entrenamiento.
            // "epoca" es el numero de epoca (arranca en 0)
            // "logs" es un objeto que trae info de esa epoca,
            // entre ellas "logs.loss" -> el valor de la perdida
            onEpochEnd: (epoca, logs) => {

                // se guarda el valor de la perdida de esta epoca
                // al final del arreglo historial_perdida
                historial_perdida.push(logs.loss);

                // se actualiza la grafica con el historial completo
                // (funcion definida en grafico.js)
                actualizar_grafico(historial_perdida);
            }
        }
    });

    // cuando termina el entrenamiento, se muestra el resumen
    // de perdida inicial, final y porcentaje de reduccion
    mostrar_info_perdida();

    // se avisa que el modelo ya esta listo para usarse
    actualizar_estado('modelo entrenado correctamente');

    // dispose() libera la memoria que ocupaban los tensores,
    // ya que no se necesitan mas una vez terminado el entrenamiento
    tensor_x.dispose();
    tensor_y.dispose();
}


// -----------------------------------------------------------
// funcion: mostrar_info_perdida
// calcula y muestra en pantalla la perdida inicial, la final
// y el porcentaje de reduccion entre ambas
// -----------------------------------------------------------
function mostrar_info_perdida() {

    // historial_perdida[0] es el valor de la primera epoca
    const perdida_inicial = historial_perdida[0];

    // historial_perdida[length - 1] es el valor de la ultima epoca
    const perdida_final = historial_perdida[historial_perdida.length - 1];

    // se calcula cuanto bajo la perdida, en porcentaje, respecto
    // al valor inicial
    const reduccion = ((perdida_inicial - perdida_final) / perdida_inicial) * 100;

    // se busca el parrafo del html donde se va a mostrar el texto
    const elemento_info = document.getElementById('info-perdida');

    // toFixed(4) y toFixed(2) limitan la cantidad de decimales
    // para que el texto se vea prolijo
    elemento_info.textContent =
        `perdida inicial: ${perdida_inicial.toFixed(4)}, ` +
        `perdida final: ${perdida_final.toFixed(4)} ` +
        `(reduccion: ${reduccion.toFixed(2)}%)`;
}
