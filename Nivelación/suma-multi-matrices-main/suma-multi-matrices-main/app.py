from flask import Flask, request, jsonify
from flask_cors import CORS
app = Flask(__name__, static_folder='public', static_url_path='')
CORS(app)

@app.route('/')
def index():
 # wn lugar de usar render_template, le pedimos que envíe el html desde la carpeta public
    return app.send_static_file('index.html')

@app.route('/calcular', methods=['POST'])
def calcular():
    data = request.json
    m1 = data['m1']
    m2 = data['m2']
    op = data['operacion']
    
    filas = len(m1)
    cols = len(m1[0])
    resultado = []

    if op == 'sumar':
        # Suma tradicional (reutilizando la lógica limpia de tu compañera)
        for i in range(filas):
            fila_res = []
            for j in range(cols):
                fila_res.append(m1[i][j] + m2[i][j])
            resultado.append(fila_res)
            
    else:
        # Multiplicación matricial tradicional (Fila x Columna)
        for i in range(filas):
            fila_res = []
            for j in range(cols):
                suma = 0
                for k in range(filas): # El tercer bucle necesario para la matemática
                    suma += m1[i][k] * m2[k][j]
                fila_res.append(suma)
            resultado.append(fila_res)
        
    return jsonify({'resultado': resultado})

if __name__ == '__main__':
    app.run(port=5000, debug=True)