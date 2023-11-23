 // Definir variables del juego
 const canvas = document.getElementById("arkanoidCanvas");
 const ctx = canvas.getContext("2d");

 let ballRadius = 4;
 let x = canvas.width / 2;
 let y = canvas.height - 30;
 let dx =7;
 let dy = 6;

 let paddleHeight = 20;
 let paddleWidth = 100;
 let paddleX = (canvas.width - paddleWidth) / 2;

 let rightPressed = false;
 let leftPressed = false;

 // Definir ladrillos con vida
 const brickRowCount = 4;
 const brickColumnCount = 20;
 const brickWidth = 40;
 const brickHeight = 20;
 const brickPadding = 10;
 const brickOffsetTop = 10;
 const brickOffsetLeft = 0;

 const bricks = [];
 for (let c = 0; c < brickColumnCount; c++) {
     bricks[c] = [];
     for (let r = 0; r < brickRowCount; r++) {
         bricks[c][r] = { x: 0, y: 0, life: Math.floor(Math.random() * 2) +5};
     }
 }

 // Manejar eventos del teclado
 document.addEventListener("keydown", keyDownHandler);
 document.addEventListener("keyup", keyUpHandler);

 function keyDownHandler(e) {
     if (e.key === "Right" || e.key === "ArrowRight") {
         rightPressed = true;
     } else if (e.key === "Left" || e.key === "ArrowLeft") {
         leftPressed = true;
     }
 }

 function keyUpHandler(e) {
     if (e.key === "Right" || e.key === "ArrowRight") {
         rightPressed = false;
     } else if (e.key === "Left" || e.key === "ArrowLeft") {
         leftPressed = false;
     }
 }

 // Detección de colisiones
 function collisionDetection() {
     for (let c = 0; c < brickColumnCount; c++) {
         for (let r = 0; r < brickRowCount; r++) {
             const b = bricks[c][r];
             if (b.life > 0) {
                 if (
                     x > b.x &&
                     x < b.x + brickWidth &&
                     y > b.y &&
                     y < b.y + brickHeight
                 ) {
                     dy = -dy;
                     b.life--;

                     if (b.life === 0) {
                         // Ladrillo completamente destruido
                         // Puedes hacer más acciones aquí, como incrementar la puntuación
                     }
                 }
             }
         }
     }
 }

 // Dibujar bola
 function drawBall() {
     ctx.beginPath();
     ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
     ctx.fillStyle = "black";
     ctx.fill();
     ctx.closePath();
 }

 // Dibujar paleta
 function drawPaddle() {
     ctx.beginPath();
     ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
     ctx.fillStyle = "black";
     ctx.fill();
     ctx.closePath();
 }

 // Dibujar ladrillos
 function drawBricks() {
     for (let c = 0; c < brickColumnCount; c++) {
         for (let r = 0; r < brickRowCount; r++) {
             if (bricks[c][r].life > 0) {
                 const brickX = c * (brickWidth + brickPadding) + brickOffsetLeft;
                 const brickY = r * (brickHeight + brickPadding) + brickOffsetTop;
                 bricks[c][r].x = brickX;
                 bricks[c][r].y = brickY;
                 ctx.beginPath();
                 ctx.rect(brickX, brickY, brickWidth, brickHeight);
                 ctx.fillStyle = "black";
                 ctx.fill();
                 ctx.closePath();
             }
         }
     }
 }

 // Dibujar el juego
 function draw() {
     ctx.clearRect(0, 0, canvas.width, canvas.height);
     drawBricks();
     drawBall();
     drawPaddle();
     collisionDetection();

     // Colisiones con los bordes
     if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
         dx = -dx;
     }
     if (y + dy < ballRadius) {
         dy = -dy;
     } else if (y + dy > canvas.height - ballRadius) {
         if (x > paddleX && x < paddleX + paddleWidth) {
             dy = -dy;
         } else {
             document.location.reload();
         }
     }

     // Mover la paleta
     if (rightPressed && paddleX < canvas.width - paddleWidth) {
         paddleX += 10;
     } else if (leftPressed && paddleX > 0) {
         paddleX -= 10;
     }

     x += dx;
     y += dy;

     requestAnimationFrame(draw);
 }

 // Iniciar el juego
 draw();