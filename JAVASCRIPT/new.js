// game constant and variable
// Self written code with taking help
let inputdir = { x: 0, y: 0 };
const movesound = new Audio('../image/move.mp3');
const musicsound = new Audio('../image/backgroundmusic.mp3');
const gameoversound = new Audio('../image/game_over_msg2_snake.mp3.mp3');
const foodsound = new Audio('../image/food.mp3');
let speed = 7;
let lastpainttime = 0;
score = 0;
snakeArr = [{ x: 13, y: 15 }];
food = { x: 6, y: 7 };

//Game function
function main(ctime) {
    window.requestAnimationFrame(ctime);
    if ((ctime - lastpainttime) / 1000 < 1 / score) {
        return;

    }
    lastpainttime = ctime;
    gameEngine();

}
function isCollaide(snake) {
    //if you hit yourself snake body
    for (let i = 0; i < snakeArr.length; i++) {
        if (snake[i].x === snakeArr.x && snake[i].y === snakeArr.y) {
            gameoversound.play()
            return true;
        }
    }
    // if snake collide into wall
    if (snake[0].x >= 18 || snake[0].x <= 0 || snake[0].y >= 18 || snake[0].y <= 0) {
        gameoversound.play()
        return true;
    }
}
function gameEngine() {
    if (isCollaide(snakeArr)) {
        gameoversound.play()
        musicsound.pause()
        inputdir = { x: 0, y: 0 };
        alert("Game Over,Press any key to Start again");
        snakeArr = [{ x: 13, y: 15 }];
        musicsound.play()
        score = 0;
    }
}
//If you have eatten the food,increment the score and regenerate the food
if (snakeArr[0].y === food.y && snakeArr[0].x == food.x) {
    foodsound.play()
    snakeArr.unshift({ x: snakeArr[0].x + inputdir.x, y: snakeArr[0].y + inputdir.y })
    score = score + 5
    scorebox.innerHTML = "Score:" + score
    let a = 2;
    let b = 16;
    food = { x: Math.round(a + (b - a) * Math.random), y: Math.round(a + (b - a) * Math.random) }

}
//Moving the snake
for (let i = snakeArr.length - 2; i >= 0; i--) {
    snakeArr[i + 1] = { ...snakeArr[i] }

}
snakeArr[0].y += inputdir.y;
snakeArr[0].x += inputdir.x;

//Render the snake and display the food
board.innerHTML = ""
snakeArr.forEach((e, index) => {
    snakeElement = document.createElement('div');
    snakeElement.style.gridRowStart = e.y;
    snakeElement.style.gridRowStart = e.x;
    if (index == 0) {
        snakeElement.classList.add('head');
    }
    else {
        snakeElement.classList.add('snake');
    }
    board.appendChild(snakeElement);

})

//Display the food
foodElement = document.createElement('div');
foodElement.style.gridRowStart = e.y;
foodElement.style.gridRowStart = e.x;
foodElement.classList.add('food');
board.appendChild(foodElement);

//Main Logic starts here
window.requestAnimationFrame(main);
window.addEventListener('keydown', e => {
    inputdir = { x: 0, y: 1 } //Start the game
    gameoversound.pause()
    musicsound.play()
    movesound.play()
    switch (e.key) {
        case "ArrowUp":
            console.log("ArrowUp")
            inputDir.x = 0;
            inputDir.y = -1;
            break;

        case "ArrowDown":
            console.log("ArrowDown")
            inputDir.x = 0;
            inputDir.y = 1;
            break;

        case "ArrowLeft":
            console.log("ArrowLeft")
            inputDir.x = -1;
            inputDir.y = 0;
            break;

        case "ArrowRight":
            console.log("ArrowRight")
            inputDir.x = 1;
            inputDir.y = 0;
            break;

        default:
            break;
    }


})