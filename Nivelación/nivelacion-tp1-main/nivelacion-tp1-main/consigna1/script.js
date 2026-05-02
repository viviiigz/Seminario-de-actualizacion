// capturamos los elementos del html
const inputTexto = document.getElementById('miTexto');
const btnColores = document.getElementById('btnColores');
const cuerpoPagina = document.body;

// lógica para detectar el enter en el input
inputTexto.addEventListener('keypress', function(evento) {
    if (evento.key === 'Enter') {
        alert(inputTexto.value); 
        inputTexto.value = ''; // limpiamos el input
    }
});

// lógica para cambiar los colores
let estadoActual = 0; 

btnColores.addEventListener('click', function() {
    // le sumamos 1 al estado actual
    estadoActual = estadoActual + 1; 
    
    // si el estado llegó a 3 lo ponemos en 0
    if (estadoActual === 3) {
        estadoActual = 0;
    }
    
    // cambiamos la clase del body según el estado actual
    cuerpoPagina.className = 'estado-' + estadoActual;
});