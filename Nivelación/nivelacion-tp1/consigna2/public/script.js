const inputTexto = document.getElementById('miTexto');
const btnColores = document.getElementById('btnColores');
const cuerpoPagina = document.body;

inputTexto.addEventListener('keydown', function(evento) {
    if (evento.key === 'Enter') {
        alert(inputTexto.value);
        inputTexto.value = ''; 
    }
});

let estadoActual = 0; 

btnColores.addEventListener('click', function() {
    estadoActual = estadoActual + 1; 
    
    if (estadoActual === 3) {
        estadoActual = 0;
    }
    
    cuerpoPagina.className = 'estado-' + estadoActual;
});