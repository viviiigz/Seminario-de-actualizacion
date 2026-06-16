#  Implementación 2: Servidor Web con Node.js y Express
##  Descripción del Proyecto
Esta segunda implementación del proyecto resuelve la misma consigna de interacción en el DOM (caja de texto y cambio de colores), pero aplicando una arquitectura Cliente-Servidor. El código fuente fue modularizado (separando HTML, CSS y JavaScript) y es servido a través de un servidor web local utilizando **Node.js** y la librería **Express**.

###  Estructura del Proyecto
El proyecto está organizado:
* `servidor.js`: Archivo principal del backend que levanta el servidor web.
* `public/`: Carpeta que contiene los archivos estáticos del frontend.
  * `index.html`: Estructura de la página.
  * `style.css`: Estilos y clases de colores.
  * `script.js`: Lógica de interacción del lado del cliente.

---

##  Instrucciones para ejecutarlo

Para hacer funcionar esta aplicación, es necesario tener instalado [Node.js] en la computadora. Luego, seguí estos pasos:

1. Abrí una terminal (consola) y navegá hasta la carpeta principal del proyecto (donde se encuentra el archivo `servidor.js`).
2. Instala la dependencia necesaria (Express) ejecutando el siguiente comando:
   ```bash
   npm install express

## Iniciar el servidor
Una vez finalizada la instalación, levantá el servidor web ejecutando:

```bash
node servidor.js
```

 ## Abrir la aplicación
Si la ejecución fue exitosa, verás un mensaje en la terminal confirmando que el servidor está encendido. Abrí tu navegador web favorito e ingresá a la siguiente dirección:
 http://localhost:3000
