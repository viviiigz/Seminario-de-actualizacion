// ===========================================================
// app.js
// este es el archivo "principal": conecta todas las piezas.
//   - define la funcion para mostrar mensajes de estado
//   - espera a que la pagina termine de cargar
//   - crea el grafico vacio
//   - conecta los botones con sus funciones
// ===========================================================


// -----------------------------------------------------------
// funcion: actualizar_estado
// recibe un texto y lo muestra dentro del parrafo #estado.
// se usa desde modelo.js y prediccion.js para avisar al
// usuario que esta pasando (entrenando, listo, error, etc)
// -----------------------------------------------------------
function actualizar_estado(texto) {
    document.getElementById('estado').textContent = `estado: ${texto}`;
}


// -----------------------------------------------------------
// evento: DOMContentLoaded
// este evento se dispara cuando el navegador ya cargo
// y armo todo el html de la pagina, antes de que cargue
// imagenes u otros recursos pesados.
// es el lugar correcto para "arrancar" la aplicacion.
// -----------------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {

    // se crea el grafico vacio, ya listo para recibir datos
    // apenas empiece el entrenamiento (funcion de grafico.js)
    crear_grafico();

    // se conecta el boton "entrenar modelo": cuando se hace click,
    // se ejecuta entrenar_modelo() (definida en modelo.js)
    document.getElementById('btn-entrenar')
        .addEventListener('click', entrenar_modelo);

    // se conecta el boton "predecir": cuando se hace click,
    // se ejecuta predecir_valores() (definida en prediccion.js)
    document.getElementById('btn-predecir')
        .addEventListener('click', predecir_valores);

    // mensaje inicial que ve el usuario al abrir la pagina
    actualizar_estado('listo. presiona "entrenar modelo" para comenzar');
});
