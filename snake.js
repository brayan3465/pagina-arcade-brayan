const canvas = document.getElementById("snakeCanvas");
const ctx = canvas.getContext("2d");

// Tamaño de la celda
const box = 20;

// Serpiente
let snake = [];
snake[0] = { x: 6 * box, y: 6 * box };

// Comida
let food = {
    x: Math.floor(Math.random() * 17 + 1) * box,
    y: Math.floor(Math.random() * 14 + 3) * box,
};

let score = 0;
let highScore = localStorage.getItem("snakeHighScore") || 0;
// Controlar dirección
let d;

document.addEventListener("keydown", direction);

function direction(event) {
    let key = event.keyCode;
    if (key == 37 && d != "RIGHT") {
        d = "LEFT";
    } else if (key == 38 && d != "DOWN") {
        d = "UP";
    } else if (key == 39 && d != "LEFT") {
        d = "RIGHT";
    } else if (key == 40 && d != "UP") {
        d = "DOWN";
    }
}

function resetGame() {
    // Reiniciar la serpiente
    snake = [];
    snake[0] = { x: 9 * box, y: 10 * box };

    // Reiniciar la comida
    food = {
        x: Math.floor(Math.random() * 17 + 1) * box,
        y: Math.floor(Math.random() * 15 + 3) * box,
    };

    // Reiniciar el puntaje
    score = 0;

    // Reiniciar la dirección
    d = undefined;
}

function draw() {
    // Posición actual de la cabeza
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    // Mover la serpiente
    if (d === "LEFT") snakeX -= box;
    if (d === "UP") snakeY -= box;
    if (d === "RIGHT") snakeX += box;
    if (d === "DOWN") snakeY += box;

    // Dibujar el fondo con el patrón de césped
    ctx.fillRect(box, 3 * box, 17 * box, 15 * box);

    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = i === 0 ? "grey" : "green";
        ctx.fillRect(snake[i].x, snake[i].y, box, box);

        ctx.strokeStyle = "black";
        ctx.strokeRect(snake[i].x, snake[i].y, box, box);
    }

    ctx.fillStyle = "red";
    ctx.fillRect(food.x, food.y, box, box);

    // Si la serpiente se come la comida
    if (snakeX === food.x && snakeY === food.y) {
        score++;
        food = {
            x: Math.floor(Math.random() * 17 + 1) * box,
            y: Math.floor(Math.random() * 15 + 3) * box,
        };
    } else {
        // Elimina la cola
        snake.pop();
    }

    // Nueva cabeza
    const newHead = {
        x: snakeX,
        y: snakeY,
    };

    // Agrega la nueva cabeza al frente del array
    snake.unshift(newHead);

    ctx.fillStyle = "#293447";
    ctx.font = "45px Changa one";
    ctx.clearRect(0, 0, canvas.width, 3 * box);

    ctx.fillText(score, 2 * box, 1.6 * box);

    // Detectar colisiones
    for (let i = 1; i < snake.length; i++) {
        if (snake[i].x === snakeX && snake[i].y === snakeY) {
            resetGame();
        }
    }

    // Detectar colisiones con los bordes
    if (
        snakeX < box ||
        snakeX > 17 * box ||
        snakeY < 3 * box ||
        snakeY > 17 * box
    ) {
        resetGame();
    }

    // Actualizar el puntaje más alto aquí
    if (score > highScore) {
        highScore = score;
        localStorage.setItem("snakeHighScore", highScore);
    }

    // Dibujar puntajes
    ctx.fillStyle = "black";
    ctx.font = "20px Arial";
    ctx.fillText("Score: " + score, box, box);
    ctx.fillText("High Score: " + highScore, box, 2 * box);
}

// Llamada a la función draw cada 100 ms
const game = setInterval(draw, 130);
