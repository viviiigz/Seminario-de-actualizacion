const express = require('express');
const path = require('path');

const app = express();
const puerto = 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.listen(puerto, function() {
    console.log("Servidor encendido en http://localhost:3000");
});