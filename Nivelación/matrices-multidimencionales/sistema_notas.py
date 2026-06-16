# (La matriz)
alumnos = [
    ['Juan', [['Matematicas',8], ['Lengua',9], ['Sociales',7], ['Naturales',7]]],
    ['Ana', [['Lengua',9], ['Matematicas',10], ['Sociales',8], ['Naturales',6]]],
    ['Luis', [['Lengua',6], ['Sociales',8], ['Matematicas',7], ['Naturales',6]]],
    ['María',[['Lengua',9], ['Sociales',10], ['Naturales',10], ['Matematicas',9]]]
]

#  Esqueleto de las funciones
def mostrar_alumnos():
    # Le decimos: "Ordename a los alumnos basándote en el resultado de su promedio, de mayor a menor (reverse=True)"
    alumnos_ordenados = sorted(alumnos, key=lambda x: obtener_promedio(x[1]), reverse=True)
    
    print("\n--- LISTA DE ALUMNOS (Ordenada por Promedio) ---")
    
    mejor_alumno = ""
    mejor_promedio = -1

    for alumno in alumnos_ordenados:
        nombre = alumno[0]
        materias = alumno[1]
        
        # Llamamos a nuestra nueva herramienta para calcular el promedio de este alumno
        promedio = obtener_promedio(materias)

        # Si el promedio actual es más grande que el que teníamos guardado, hay un nuevo ganador
        if promedio > mejor_promedio:
            mejor_promedio = promedio
            mejor_alumno = nombre

        #  para que el promedio muestre solo 2 decimales
        print(f"\n🎖 Alumno: {nombre} | Promedio: {promedio:.2f}")
        
        for materia in materias:
            print(f"   - {materia[0]}: {materia[1]}")

    # Al terminar de mostrar a todos, anunciamos al ganador
    if mejor_alumno != "":
        print(f" MEJOR PROMEDIO: {mejor_alumno} con {mejor_promedio:.2f}")
        
def agregar_alumno():
    print("\n--- AGREGAR NUEVO ALUMNO ---")
    
    # Le pedimos el nombre al usuario
    nombre_nuevo = input("Ingresá el nombre del alumno: ")

    # Buscamos si ya existe en nuestra matriz
    existe = False
    for alumno in alumnos:
        # Usamos .lower() para comparar todo en minúsculas y evitar errores
        # (Así "Juan" y "juan" se consideran iguales)
        if alumno[0].lower() == nombre_nuevo.lower():
            existe = True
            break  # Si ya lo encontró, rompemos este bucle para no seguir buscando de más

    # Tomamos una decisión basada en si lo encontró o no
    if existe:
        print("××× ¡Error! Ese alumno ya está registrado en el sistema. ×××")
    else:
        # El .append() agrega un elemento al final de nuestra matriz principal.IMPORTANTE 
        # Fijate que agregamos una lista que adentro tiene el nombre y OTRA lista vacía [] para sus futuras notas.
        alumnos.append([nombre_nuevo, []])
        print(f"★ ¡Alumno {nombre_nuevo} agregado con éxito! ★")

def gestionar_notas():
    print("\n--- AGREGAR O MODIFICAR NOTAS ---")
    
    #  Le pedimos el nombre del alumno
    nombre_buscar = input("Ingresá el nombre del alumno: ")

    #  Buscamos en QUÉ POSICIÓN (índice) está el alumno

    indice_alumno = -1  # Arranca en -1 que significa "no encontrado"
    for i in range(len(alumnos)):
        if alumnos[i][0].lower() == nombre_buscar.lower():
            indice_alumno = i # Guardamos el número de cajón donde está
            break

    # Si sigue siendo -1, es porque no existe
    if indice_alumno == -1:
        print("××× ¡Error! El alumno no existe. Agregalo primero con la opción 2. ×××")
    else:
        # Si lo encontró, pedimos los datos de la nota
        materia_nueva = input("Ingresá el nombre de la materia: ")
        # Usamos float() para convertir el texto en un número con decimales (ej: 8.5)
        nota_nueva = float(input("Ingresá la nota: "))

        # Nos metemos en la sub-lista de materias de ESE alumno en particular
        materias_del_alumno = alumnos[indice_alumno][1]
        materia_encontrada = False

        #  Buscamos si la materia ya existe
        for i in range(len(materias_del_alumno)):
            if materias_del_alumno[i][0].lower() == materia_nueva.lower():
                # Si existe, entramos a ese cajoncito y le cambiamos la nota
                materias_del_alumno[i][1] = nota_nueva
                materia_encontrada = True
                print(f"★ Nota modificada. {materia_nueva} ahora tiene un {nota_nueva}. ★")
                break

        # Si la materia no existía, la agregamos al final de sus materias
        if not materia_encontrada:
            materias_del_alumno.append([materia_nueva, nota_nueva])
            print(f"★ Materia agregada. {materia_nueva}: {nota_nueva}. ★")

def obtener_promedio(materias):
 
    # Si el alumno no tiene materias, su promedio es 0
    if len(materias) == 0: 
        return 0
    
    suma = 0
    for materia in materias:
        suma += materia[1]  # materia[1] es la nota
        
    return suma / len(materias)


def iniciar_sistema():

    while True:
        print("\n--- MENÚ PRINCIPAL ---")
        print("1. Ver alumnos")
        print("2. Agregar alumno")
        print("3. Agregar o modificar notas")
        print("4. Salir")

        opcion = input("Elige una opción (1-4): ")

        if opcion == '1':
            mostrar_alumnos()
        elif opcion == '2':
            agregar_alumno()
        elif opcion == '3':
            gestionar_notas()
        elif opcion == '4':
            print("Saliendo del programa... ¡Chau!")
            break
        else:
            print("Opción no válida. Por favor, ingresá un número del 1 al 4.")


iniciar_sistema()