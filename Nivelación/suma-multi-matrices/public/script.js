// dibbujar matrices
function dibujarMatrices() {
    const f = parseInt(document.getElementById("filas").value);
    const c = parseInt(document.getElementById("columnas").value);
    const contenedor = document.getElementById("contenedor-matrices");
    contenedor.innerHTML = "";

    if (!f || !c) return alert("Ingresa filas y columnas");

    // Dibuja las 2 matrices con un solo ciclo
    for (let i = 1; i <= 2; i++) {
        let div = document.createElement("div");
        div.className = "matrix-card";
        div.innerHTML = `<h3>Matriz ${i}</h3>`;
        for (let r = 0; r < f; r++) {
            for (let l = 0; l < c; l++) {
                // Le asignamos la clase m1 o m2
                div.innerHTML += `<input type="number" class="m${i} celda" value="0">`;
            }
            div.innerHTML += "<br>";
        }
        contenedor.appendChild(div);
    }
    document.getElementById("controles").style.display = "block";
}

// lee los datos de lls inputs y los convierte en matrices de números
function obtenerMatriz(clase, f, c) {
    const inputs = document.querySelectorAll(`.${clase}`);
    let matriz = [];
    let k = 0; // Índice para recorrer todos los inputs de corrido

    for (let i = 0; i < f; i++) {
        let fila = [];
        for (let j = 0; j < c; j++) {
            let val = inputs[k].value;
            if (val === "" || isNaN(val)) return null; 
            fila.push(parseFloat(val));
            k++;
        }
        matriz.push(fila);
    }
    return matriz;
}

// para la logica local
function operarLocal(operacion) {
    const f = parseInt(document.getElementById("filas").value);
    const c = parseInt(document.getElementById("columnas").value);
    
    if (operacion === 'multiplicar' && f !== c) {
        return alert("Para la multiplicación tradicional usando este diseño, las matrices deben ser cuadradas (ej: 2x2, 3x3)");
    }

    const m1 = obtenerMatriz("m1", f, c);
    const m2 = obtenerMatriz("m2", f, c);
    if (!m1 || !m2) return alert("Carga todos los datos numéricos");

    let res = [];
    for (let i = 0; i < f; i++) {
        let filaRes = [];
        for (let j = 0; j < c; j++) {
            if (operacion === "sumar") {
                filaRes.push(m1[i][j] + m2[i][j]);
            } else {
                // Multiplicación tradicional (filas por columnas)
                let suma = 0;
                for (let k = 0; k < f; k++) {
                    suma += m1[i][k] * m2[k][j];
                }
                filaRes.push(suma);
            }
        }
        res.push(filaRes);
    }
    mostrarResultado(res, "Calculado en Local");
}

// para la logica del servidor
async function operarServidor(operacion, puerto) {
    const f = parseInt(document.getElementById("filas").value);
    const c = parseInt(document.getElementById("columnas").value);
    
    if (operacion === 'multiplicar' && f !== c) {
        return alert("Para multiplicar, deben ser matrices cuadradas (ej: 2x2).");
    }

    const m1 = obtenerMatriz("m1", f, c);
    const m2 = obtenerMatriz("m2", f, c);
    if (!m1 || !m2) return;

    try {
        const respuesta = await fetch(`http://localhost:${puerto}/calcular`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ m1: m1, m2: m2, operacion: operacion })
        });
        const data = await respuesta.json();
        let entorno = puerto === 3000 ? "NodeJS" : "Python";
        mostrarResultado(data.resultado, `Calculado en ${entorno}`);
    } catch (error) {
        alert(`Error: ¿El servidor en el puerto ${puerto} está encendido?`);
    }
}

function mostrarResultado(m, mensaje) {
    let html = `<h4 style="color: #0056b3;">${mensaje}</h4><div class="matrix-card" style="display:inline-block;">`;
    m.forEach(fila => {
        html += fila.join(" &nbsp;|&nbsp; ") + "<br><br>";
    });
    html += "</div>";
    document.getElementById("resultado").innerHTML = html;
}