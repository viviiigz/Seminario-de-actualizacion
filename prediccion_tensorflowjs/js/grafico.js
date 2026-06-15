// ===========================================================
// grafico.js
// este archivo se encarga unicamente de la parte visual de
// la grafica de perdida, usando la libreria chart.js.
//
// objetivo de la actividad:
//   - eje x -> epocas
//   - eje y -> valor de perdida (loss)
//   - curva que va bajando a medida que avanza el entrenamiento
// ===========================================================

// variable global que va a guardar la instancia del grafico,
// para poder actualizarla despues sin crearla de nuevo
let grafico_perdida;


// -----------------------------------------------------------
// funcion: crear_grafico
// crea el grafico vacio (sin datos). se llama una sola vez,
// cuando se carga la pagina (ver app.js)
// -----------------------------------------------------------
function crear_grafico() {

    // se obtiene el elemento <canvas> del html por su id,
    // y getContext('2d') prepara esa zona para poder dibujar
    const contexto = document.getElementById('grafico-perdida').getContext('2d');

    // new Chart(...) crea un grafico nuevo dentro del canvas
    grafico_perdida = new Chart(contexto, {

        // type: 'line' -> grafico de lineas, ideal para mostrar
        // como cambia un valor a lo largo del tiempo (epocas)
        type: 'line',

        data: {
            // labels: valores que se muestran en el eje x.
            // arranca vacio porque todavia no hay epocas
            labels: [],

            datasets: [{
                label: 'perdida (loss)',   // nombre que aparece en la leyenda

                data: [],                  // valores del eje y, arranca vacio

                borderColor: 'rgb(75, 192, 192)',          // color de la linea
                backgroundColor: 'rgba(75, 192, 192, 0.2)', // color de relleno bajo la linea

                borderWidth: 2,  // ancho de la linea
                tension: 0.2,    // curva un poco mas suave (menos angulosa)
                pointRadius: 0   // no dibuja un puntito en cada epoca (mas limpio)
            }]
        },

        options: {
            responsive: true, // el grafico se adapta al tamaño de su contenedor

            scales: {
                // configuracion del eje x (epocas)
                x: {
                    title: { display: true, text: 'epoca' }
                },
                // configuracion del eje y (valor de perdida)
                y: {
                    title: { display: true, text: 'valor de perdida' },
                    beginAtZero: true // el eje y siempre arranca en 0
                }
            }
        }
    });
}


// -----------------------------------------------------------
// funcion: actualizar_grafico
// se llama cada vez que termina una epoca (desde modelo.js)
// y redibuja la curva con el historial actualizado
// -----------------------------------------------------------
function actualizar_grafico(historial) {

    // se generan las etiquetas del eje x a partir de las posiciones
    // del arreglo: si historial tiene 5 elementos, las etiquetas
    // van a ser [1, 2, 3, 4, 5] (epoca 1 a epoca 5)
    grafico_perdida.data.labels = historial.map((valor, indice) => indice + 1);

    // se reemplazan los datos del eje y por el historial completo
    // de valores de perdida hasta el momento
    grafico_perdida.data.datasets[0].data = historial;

    // update('none') vuelve a dibujar el grafico con los datos nuevos.
    // 'none' desactiva la animacion para que se vea fluido mientras
    // se actualiza epoca por epoca
    grafico_perdida.update('none');
}
