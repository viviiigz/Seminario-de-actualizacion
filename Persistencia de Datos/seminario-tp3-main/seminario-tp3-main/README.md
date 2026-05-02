# Registro de Alumnos - SDA TP3

Este proyecto consiste en una aplicación web para el registro de alumnos, desarrollada en dos partes: una versión frontend (solo navegador) y una versión con backend (servidor Node.js + Express). Ambas cumplen con la consigna de persistencia y ordenamiento de datos.

## Parte 1: Aplicación Frontend (Solo Navegador)

- Permite cargar datos de alumnos: nombre, edad y nota.
- Los datos se almacenan en el navegador usando `localStorage`, por lo que persisten aunque se cierre y vuelva a abrir el navegador.
- Al cargar un nuevo alumno, la página se recarga y muestra la lista de alumnos ordenada:
  - Primero por nota (de mayor a menor).
  - Si hay empate de nota, por nombre (alfabéticamente).
- Todo el procesamiento y almacenamiento ocurre en el cliente, sin necesidad de servidor.

**Archivo principal:**  
- `punto1/index.html`

## Parte 2: Aplicación con Backend (Node.js + Express)

- El backend sirve la página web y expone una API REST para cargar y consultar alumnos.
- Los datos de cada usuario se almacenan en memoria del servidor, separados por un identificador único generado en el navegador.
- Cada usuario ve solo sus propios alumnos, incluso si accede desde diferentes computadoras o IPs.
- Al recargar la página, el servidor envía los datos previamente cargados por ese usuario.
- El backend es accesible desde cualquier IP (escucha en `0.0.0.0`).

**Archivos principales:**  
- `punto2/server.mjs` (servidor Express)
- `punto2/public/index.html` (frontend adaptado para consumir la API)

## Instalación y Ejecución

### Requisitos

- Node.js >= 14
- Navegador moderno

### Ejecución del Backend

1. Instala dependencias:
   ```powershell
   cd punto2
   npm install
   ```
2. Inicia el servidor:
   ```powershell
   node server.mjs
   ```
3. Accede a la aplicación desde tu navegador en [http://localhost:3000](http://localhost:3000).

### Uso

- Completa el formulario para cargar alumnos.
- Los datos se mostrarán ordenados y persistirán según la modalidad (localStorage o backend).
- En la versión backend, cada usuario tiene su propia lista de alumnos, identificada automáticamente.

## Estructura del Proyecto

```
punto1/
  index.html           # Frontend solo navegador
punto2/
  server.mjs           # Backend Express
  package.json         # Dependencias backend
  public/
    index.html         # Frontend para backend
```

## Tecnologías

- **Frontend:** HTML, CSS, JavaScript
- **Backend:** Node.js, Express, CORS

## Consideraciones

- En la versión backend, los datos persisten solo mientras el servidor esté en ejecución (almacenamiento en memoria).
- Para persistencia permanente, se recomienda integrar una base de datos.

## Autor

- Viviana González 2026