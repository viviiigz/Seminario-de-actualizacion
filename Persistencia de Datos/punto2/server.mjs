import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('public')); 

// va a guardar listas separadas por usuario.
const memoria = {}; 

// cuando el frontend PIDE los datos (GET)
app.get('/api/estudiantes', (req, res) => {
    const usuario = req.headers['mi-identificador']; // Leemos quién nos habla
    
    // si este usuario no tiene alumnos guardados todavía, le devolvemos una lista vacía
    if (!memoria[usuario]) {
        memoria[usuario] = []; 
    }
    
    res.json(memoria[usuario]);
});

// cuando el front GUARDA un dato (POST)
app.post('/api/estudiantes', (req, res) => {
    const usuario = req.headers['mi-identificador'];
    const estudiante = req.body;

    if (!memoria[usuario]) {
        memoria[usuario] = [];
    }
    
    // metemos el estudiante solo en la lista de ESE usuario
    memoria[usuario].push(estudiante);

    res.json({ mensaje: "Guardado" });
});

// levantamos el servidor
app.listen(3000, '0.0.0.0', () => {
    console.log("Servidor corriendo en http://localhost:3000");
});