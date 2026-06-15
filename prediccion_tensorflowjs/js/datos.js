// ===========================================================
// datos.js
// este archivo solo contiene los datos que va a usar el modelo
// para entrenarse. separarlos en su propio archivo hace que sea
// facil cambiarlos sin tocar la logica del modelo.
//
// la relacion entre x e y es aproximadamente lineal:
// y = 1.8 * x  (con un poquito de variacion, para que sea mas real)
// ===========================================================

// arreglo con los valores de entrada (x) que va a "ver" el modelo
const datos_x = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// arreglo con los valores de salida (y) que corresponden a cada x
// el modelo va a intentar aprender la relacion entre datos_x y datos_y
const datos_y = [1.7, 3.6, 5.5, 7.6, 9.2, 11.1, 12.8, 14.9, 16.5, 18.3];
