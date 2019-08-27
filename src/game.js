import { Ball, Brick, Paddle } from "breakout-wasm";

export function breakout_game(canvasId, canvasWidth, canvasHeight) {
    const canvas = document.getElementById(canvasId);
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;

    var mouseX = canvas.width / 2;

    const ctx = canvas.getContext("2d"),
        ball = Ball.new(canvas.width / 2, canvas.height / 1.25, canvas.width / 120),
        paddle = Paddle.new(mouseX - canvas.width / 8,
            canvas.height - canvas.height / 30 - 5,
            canvas.width / 8,
            canvas.height / 30),
        bricks = [];

    (() => {
        let colors = ["red", "orange", "yellow", "green", "blue"];
        let brickWidthOffset = canvas.width / 25;
        let brickHeight = canvas.height / 13;
        let brickYOffset = canvas.height / 6;
        let endWidth = canvas.width - canvas.width / 10;
        for (let y = 0; y < 5; ++y) {
            let x = 4;

            while (x < endWidth) {
                let w = Math.random() * brickWidthOffset + brickWidthOffset;
                bricks.push(
                    Brick.new(x, y * (brickHeight + 5) + brickYOffset, w, brickHeight, colors[y]));
                x += w + 5;
            }
            bricks.push(
                Brick.new(x,
                    y * (brickHeight + 5) + brickYOffset,
                    canvas.width - x - 4,
                    brickHeight,
                    colors[y]));
        }
    })();

    function drawBricks() {
        for (let b of bricks) {
            ctx.beginPath();
            ctx.rect(b.x(), b.y(), b.w(), b.h());
            ctx.fillStyle = b.color();
            ctx.fill();
            ctx.closePath();
        }
    }

    function breakBricks() {
        for (let i = 0; i < bricks.length; ++i) {
            if (ball.break_bricks(bricks[i].x(), bricks[i].y(), bricks[i].w(), bricks[i].h())) {
                bricks.splice(i, 1);
            }
        }
    }

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Ball
        ctx.beginPath();
        ctx.arc(ball.x(), ball.y(), ball.r(), 0, Math.PI * 2);
        ctx.fillStyle = "#FF00FF";
        ctx.fill();
        ctx.closePath();

        // Paddle
        ctx.beginPath();
        ctx.rect(paddle.x(), paddle.y(), paddle.w(), paddle.h());
        ctx.fillStyle = "#FF00FF";
        ctx.fill();
        ctx.closePath();

        drawBricks();

        paddle.control(mouseX);
        ball.bounce();

        ball.hit_paddle(paddle.x(), paddle.y(), paddle.w());
        breakBricks();

        if (ball.edge_collide(canvas.width, canvas.height)) {
            alert("G A M E   O V E R");
            location.reload(true);
        }

        if (bricks.length === 0) {
            alert("You win!");
            location.reload(true);
        }
    }

    function mouseMove(e) {
        mouseX = e.screenX;
    }

    document.addEventListener('mousemove', mouseMove);

    setInterval(draw, 10);
};

breakout_game("gameCanvas", window.innerWidth, window.innerHeight);