# 🎓 Sistema de Gestión de Calificaciones

## 📄 Descripción
Este proyecto es una aplicación de consola desarrollada en Python que permite administrar las calificaciones de distintos alumnos. El sistema gestiona la información puramente en memoria utilizando **matrices multidimensionales** (listas dentro de listas), cumpliendo con la restricción de no utilizar bases de datos ni interfaces gráficas.

## 🚀 Funcionalidades
El sistema cuenta con un menú interactivo que permite realizar las siguientes operaciones:

1. **Ver alumnos:** Muestra la lista completa de alumnos registrados con sus respectivas materias y notas. 
   - ⭐ **Bonus implementado:** Los alumnos se muestran ordenados de mayor a menor según su promedio general, y el sistema destaca al alumno con el mejor promedio.
2. **Agregar alumno:** Permite registrar un nuevo estudiante en la matriz. Incluye validación para evitar duplicados.
3. **Agregar o modificar notas:** Permite buscar a un alumno existente y actualizar la nota de una de sus materias, o agregarle una materia completamente nueva si aún no la cursó.
4. **Salir:** Finaliza la ejecución del programa.

## 📦 Estructura de Datos
El sistema utiliza una matriz principal donde cada elemento es una lista que representa a un alumno. El formato base respeta la siguiente estructura:

```python
[
  ['NombreAlumno', [['Materia1', Nota], ['Materia2', Nota]]]
]

```
## 🛠️ Tecnologías utilizadas
* **Lenguaje:** Python 3.x
* **Entorno:** Terminal / Consola de comandos

## 💻 Cómo ejecutarlo
Para correr este programa en tu entorno local, seguí estos pasos:

1. Asegurate de tener Python instalado en tu sistema.
2. Abrí una terminal y posicionala en la carpeta del proyecto.
3. Ejecutá el siguiente comando:

```bash
python sistema_notas.py
```

## González Viviana 