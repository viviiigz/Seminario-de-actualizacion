// importamos la librería nativa moderna de Node.js pq 
// necesitamos ver en la consola y pedir datos al usuario, y no tenemos prompt ni alert
import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';

// Preparamos la interfaz de la terminal
const rl = readline.createInterface({ input, output });

async function ejecutarPrograma() {
    let personas = [];
    let continuar = true;

    console.log("=== INICIANDO SISTEMA ===");

    // entrada y procesamiento de datos
    while (continuar) {
        // en la terminal usamos await rl.question en lugar de prompt
        let nombre = await rl.question("Escriba su nombre si desea continuar. Caso contrario escriba 'cancelar': ");

        if (nombre === "cancelar" || nombre === "Cancelar" || nombre === "CANCELAR") {
            continuar = false; // el programa se detendra
            break;
        } else {
            let edadStr = await rl.question("¿Cuál es tu edad " + nombre + "? ");
            let notaStr = await rl.question("¿Cuál es tu nota " + nombre + "? ");
            
            let edad = parseFloat(edadStr);
            let nota = parseFloat(notaStr);
            
            personas.push([nombre, edad, nota]); 
        }
    }

    rl.close();

    // salida de datos

    console.log("\n--- MATRIZ GENERAL ---");
    for (let i = 0; i < personas.length; i++) {
        let nombre = personas[i][0];
        let edad = personas[i][1];
        let nota = personas[i][2];
        console.log("Nombre: " + nombre + ", Edad: " + edad + ", Nota: " + nota);
    }

    console.log("\n--- PERSONAS ORDENADAS POR NOTA DE MAYOR A MENOR ---");
    let personasOrdenadas = personas.slice(); 
    personasOrdenadas.sort(function(a, b) {
        return b[2] - a[2]; // Compara las notas 
    });

    for (let i = 0; i < personasOrdenadas.length; i++) {
        console.log("Nombre: " + personasOrdenadas[i][0] + " | Edad: " + personasOrdenadas[i][1] + " | Nota: " + personasOrdenadas[i][2]);
    }

    console.log("\n--- PROMEDIO GENERAL ---");
    let suma = 0;
    for (let i = 0; i < personas.length; i++) {
        suma = suma + personas[i][2]; // Vamos acumulando las notas
    }
    
    if (personas.length > 0) {
        let promedio = suma / personas.length;
        console.log("Promedio del grupo: " + promedio);
    } else {
        console.log("No se ingresaron datos para promediar.");
    }
}

// arrancamos el programa
ejecutarPrograma();