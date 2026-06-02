// --- CONFIGURACIÓN INICIAL ---
// Apuntamos al archivo local que subiste (deben estar en la misma carpeta)
const MODEL_PATH = './ttt_model.json';

let model;
let boardState = [0, 0, 0, 0, 0, 0, 0, 0, 0];
let gameActive = false;

// Referencias al DOM
const boardElement = document.getElementById('board');
const statusElement = document.getElementById('status');
const resetBtn = document.getElementById('resetBtn');

// Patrones de victoria (filas, columnas, diagonales)
const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];

// --- INICIALIZACIÓN ---
async function initGame() {
    try {
        // Carga el modelo neuronal desde tus archivos locales
        model = await tf.loadLayersModel(MODEL_PATH);
        statusElement.innerText = '¡Modelo cargado! Es tu turno (O)';
        resetBtn.disabled = false;
        gameActive = true;
        renderBoard();
    } catch (error) {
        console.error("Error cargando el modelo:", error);
        statusElement.innerText = 'Error al cargar el modelo local. Asegúrate de usar un servidor local.';
        statusElement.style.color = "red";
    }
}

// --- RENDERIZADO VISUAL ---
function renderBoard() {
    boardElement.innerHTML = '';
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.className = 'cell';
        
        if (boardState[i] === -1) {
            cell.innerText = 'O';
            cell.classList.add('o');
        } else if (boardState[i] === 1) {
            cell.innerText = 'X';
            cell.classList.add('x');
        }
        
        cell.onclick = () => handleHumanMove(i);
        boardElement.appendChild(cell);
    }
}

// --- LÓGICA DEL HUMANO ---
function handleHumanMove(index) {
    if (!gameActive || boardState[index] !== 0) return;

    boardState[index] = -1; // Según el libro: -1 es el humano
    renderBoard();

    if (checkGameStatus()) return;

    statusElement.innerText = 'La IA está pensando...';
    gameActive = false;
    
    // Le damos tiempo al navegador para dibujar la 'O' antes de que la IA piense
    setTimeout(handleAIMove, 100); 
}

// --- LÓGICA DE LA IA (TENSORFLOW) ---
function handleAIMove() {
    tf.tidy(() => {
        // Convertimos el estado del tablero a un tensor
        const inputTensor = tf.tensor2d([boardState]);
        
        // Hacemos la predicción
        const prediction = model.predict(inputTensor);
        const probabilities = prediction.dataSync();

        let bestMove = -1;
        let highestProb = -Infinity;

        // Buscamos la casilla vacía con mayor probabilidad
        for (let i = 0; i < 9; i++) {
            if (boardState[i] === 0 && probabilities[i] > highestProb) {
                highestProb = probabilities[i];
                bestMove = i;
            }
        }

        // Ejecutamos el movimiento
        if (bestMove !== -1) {
            boardState[bestMove] = 1; // Según el libro: 1 es la IA
        }
    });

    renderBoard();
    
    if (!checkGameStatus()) {
        statusElement.innerText = 'Es tu turno (O)';
        gameActive = true;
    }
}

// --- VALIDACIONES DE ESTADO ---
function checkGameStatus() {
    for (const pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (boardState[a] !== 0 && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
            gameActive = false;
            statusElement.innerText = boardState[a] === -1 ? '¡Felicidades, ganaste!' : '¡La IA te ha vencido!';
            return true;
        }
    }

    if (!boardState.includes(0)) {
        gameActive = false;
        statusElement.innerText = '¡Es un Empate!';
        return true;
    }

    return false;
}

// --- REINICIO ---
resetBtn.onclick = () => {
    boardState = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    gameActive = true;
    statusElement.innerText = 'Es tu turno (O)';
    renderBoard();
};

// Arrancamos la aplicación
initGame();