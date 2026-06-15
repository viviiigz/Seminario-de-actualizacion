# prediccion con tensorflow.js - grafica de perdida (loss)

## objetivo de la actividad

el objetivo de este proyecto es entender como entrenar un modelo
secuencial simple con **tensorflow.js** y poder visualizar como
evoluciona la **funcion de perdida (loss)** a lo largo de las epocas
de entrenamiento.

para esto se cumple con lo pedido en la consigna:

- se captura el valor de `loss` en cada epoca usando el callback
  `onEpochEnd` de `model.fit()`.
- esos valores se guardan en un arreglo (`historial_perdida`).
- ese arreglo se grafica en tiempo real con **chart.js**, mostrando:
  - eje x -> numero de epoca
  - eje y -> valor de perdida (loss)
  - una curva que arranca alta y va bajando a medida que el modelo
    aprende (epoca 1 alta, epoca 10 mas baja, epoca 100 muy baja)

ademas, una vez entrenado el modelo, se puede usar la seccion de
**prediccion** para escribir uno o varios valores de `x` (separados
por comas) y ver que valor de `y` predice el modelo para cada uno.

## que aprende el modelo

el modelo aprende una relacion lineal simple entre `x` e `y`
(`y` es aproximadamente `1.8 * x`), usando 10 pares de datos definidos
en `js/datos.js`. es un ejemplo chico a proposito, para poder enfocarse
en la parte de entrenamiento, captura de perdida y graficado.

## estructura del proyecto

```
prediccion_tensorflowjs/
├── index.html          -> estructura de la pagina (html)
├── css/
│   └── estilos.css      -> estilos visuales (css)
└── js/
    ├── datos.js          -> datos de entrenamiento (x e y)
    ├── modelo.js          -> crea y entrena el modelo, captura la perdida
    ├── grafico.js          -> crea y actualiza la grafica con chart.js
    ├── prediccion.js          -> calcula y muestra las predicciones
    └── app.js                  -> conecta todo (botones, eventos, estado)
```

cada archivo tiene una sola responsabilidad y esta comentado
linea por linea, para que sea facil seguir el codigo.

## como se levanta el proyecto

no necesita instalacion ni node, ni npm: todo se ejecuta en el
navegador, usando tensorflow.js y chart.js desde un cdn.

### opcion 1 (la mas simple)

1. descomprimir el archivo .zip.
2. entrar a la carpeta `prediccion_tensorflowjs`.
3. hacer doble click en `index.html` para abrirlo con el navegador
   (chrome, edge, firefox, etc).

### opcion 2 (con un servidor local, opcional)

algunos navegadores son mas estrictos con los archivos abiertos
directamente. si la opcion 1 no funciona bien, se puede levantar
un servidor local muy simple desde la carpeta del proyecto:

con python instalado:

```
cd prediccion_tensorflowjs
python -m http.server 8080
```

y despues abrir en el navegador:

```
http://localhost:8080
```

## como usarlo

1. al abrir la pagina, hacer click en el boton **entrenar modelo**.
2. mientras se entrena, la grafica de "perdida durante el
   entrenamiento" se va dibujando epoca por epoca, mostrando como
   la perdida baja de un valor alto a uno muy bajo.
3. al terminar, debajo de la grafica aparece la perdida inicial,
   la perdida final y el porcentaje de reduccion.
4. en la seccion **prediccion**, escribir uno o varios valores de
   `x` separados por comas (por ejemplo `10, 20, 25`) y hacer click
   en **predecir**.
5. abajo van a aparecer los resultados, con el valor de `y`
   estimado por el modelo para cada `x` ingresado.
