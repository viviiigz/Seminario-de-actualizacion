# 🚀 Introducción a TensorFlow.js: De Redes Neuronales a Modelos Pre-entrenados

Este repositorio documenta mi proceso de aprendizaje y experimentación con **TensorFlow.js**, la biblioteca de Google para ejecutar Inteligencia Artificial directamente en el navegador web (Client-side AI).

El proyecto está dividido en dos grandes etapas: la construcción de un modelo secuencial desde cero y la implementación de modelos pre-entrenados de alto nivel.

---

## 🧠 Teoría Fundamental: ¿Por qué en el navegador?

Tradicionalmente, la Inteligencia Artificial requiere servidores potentes (Backend). Al utilizar TensorFlow.js, realizamos **"Edge AI"** (Inferencia en el lado del cliente). Esto significa que el navegador del usuario descarga el "cerebro" matemático y realiza los cálculos usando su propia memoria RAM y tarjeta gráfica. 
* **Ventajas:** Mayor privacidad (los datos no viajan a internet), menor latencia (no hay tiempos de espera del servidor) y cero costos de servidor para inferencias.

---

## 🛠️ Proyecto 1: El Modelo Secuencial (Aproximación al 39)

En nuestra primera etapa, construimos una red neuronal "desde cero" para enseñarle a la computadora una relación matemática. 

### ¿Cómo funcionaba?
El objetivo era que el modelo dedujera la regla matemática oculta detrás de un conjunto de números. La regla era $y = 2x - 1$. 
Al entrenar el modelo con ejemplos (si $x=1, y=1$; si $x=2, y=3$), la red neuronal ajustó sus pesos internos. Cuando le pedimos predecir el valor para $x=20$, el modelo no hizo un cálculo exacto, sino una **predicción probabilística**, arrojando un número extremadamente cercano a **39** (ej. `38.987`).

### ¿Por qué instalamos Yarn y dependencias locales?
Para este primer ejercicio configuramos un entorno de desarrollo profesional:
1. **Yarn / NPM:** Son gestores de paquetes. Se utilizan para descargar librerías (como `@tensorflow/tfjs`) directamente al disco duro en una carpeta `node_modules`.
2. **Entorno Node:** Instalarlo localmente nos permite usar herramientas modernas (empaquetadores como Webpack o Vite) que compilan, minifican y optimizan el código antes de subirlo a producción. Es el estándar en la industria para aplicaciones grandes.

---

## 📦 Proyecto 2: Modelos Pre-entrenados (Camión y Toxicidad)

Para la segunda etapa, cambiamos de estrategia. En lugar de entrenar una red neuronal básica, utilizamos **Transfer Learning** (Aprendizaje Transferido), consumiendo modelos gigantes de Google que ya fueron entrenados con millones de datos.

### La Arquitectura (El método CDN)
A diferencia del primer proyecto, aquí **no usamos Yarn**. Optamos por importar TensorFlow mediante un **CDN (Content Delivery Network)** colocando etiquetas `<script>` en el HTML. 
* **¿Por qué?** Es ideal para prototipado rápido. El navegador descarga la librería temporalmente de internet sin necesidad de instalar nada en la computadora, facilitando la integración de IA en archivos HTML estáticos.

### Los Modelos Implementados:
1. **COCO-SSD (Computer Vision):** Un modelo de detección de objetos. Le pasamos una imagen estática y la IA analiza los píxeles para detectar clases específicas (en este caso, buscar un `truck` / camión).
2. **Toxicity (NLP - Procesamiento de Lenguaje Natural):** Un modelo de análisis de texto. Evalúa frases en inglés y clasifica su nivel de toxicidad basándose en un **Umbral (Threshold)** definido por el programador (ej. $> 0.90$ de probabilidad).

### 🐛 El desafío del CORS
Durante el desarrollo de la visión artificial, enfrentamos el error de seguridad **CORS** (Cross-Origin Resource Sharing). El navegador bloqueaba a la IA para que no leyera los píxeles de una imagen externa. 
* **La solución:** Se agregó el atributo `crossorigin="anonymous"` a la etiqueta `<img>` y se sirvieron los archivos mediante un micro-servidor local.

---

## ⚙️ Cómo ejecutar este proyecto

Para evitar errores de lectura de archivos locales en el navegador, el proyecto no debe abrirse con doble clic, sino a través de un servidor HTTP estático.

1. Abre una terminal en la raíz de este proyecto.
2. Ejecuta el servidor local utilizando Node:
   ```bash
   npx http-server