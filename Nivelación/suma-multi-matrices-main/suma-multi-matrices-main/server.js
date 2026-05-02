import express from "express";
import cors from "cors";

const app = express();
app.use(cors());

app.use(express.json());

app.use(express.static("public")); 

const PORT = 3000;

app.post("/calcular", (req, res) => {
  const { m1, m2, operacion } = req.body;
  
  let resultado = [];
  const filas = m1.length;
  const cols = m1[0].length;

  for (let i = 0; i < filas; i++) {
    resultado[i] = []; // Preparamos la fila vacía
    
    for (let j = 0; j < cols; j++) {
      if (operacion === "sumar") {
        // Suma tradicional
        resultado[i][j] = m1[i][j] + m2[i][j];
        
      } else {
        // Multiplicación matricial tradicional (Fila x Columna)
        let suma = 0;
        for (let k = 0; k < filas; k++) { // El famoso tercer bucle
          suma += m1[i][k] * m2[k][j];
        }
        resultado[i][j] = suma;
      }
    }
  }
  
  // Enviamos la respuesta al cliente
  res.json({ resultado });
});

app.listen(PORT, () => {
    console.log(`Servidor NodeJS encendido en: http://localhost:${PORT}`);
});