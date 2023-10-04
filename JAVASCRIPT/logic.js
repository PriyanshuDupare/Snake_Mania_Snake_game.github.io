// Game constants and variables
let inputDir={x:0,y:0};
const foodsound=new Audio("../image/food.mp3");
const gameoversound=new Audio('../image/game_over_msg2_snake.mp3');
const movesound= new Audio('../image/move.mp3');
const musicsound=new Audio('../image/backgroundmusic.mp3');
const gameclosesound=new Audio('../image/083822_8-bit-quotgame-overquot-82872.mp3')
let speed=6;
let score=0;
let lastPaintTime=0;
let snakeArr=[
    {x:13,y:15}
]
food={x:6, y:7};
// Game function
function main(ctime){
    window.requestAnimationFrame(main);
    // console.log(ctime)
    if((ctime-lastPaintTime)/1000<1/speed){
        return;

    }
    lastPaintTime=ctime;
    gameEngine();
}
function isCollaide(snake){
    // If you hit yourself snake body
    for  (let i=1;i<snakeArr.length;i++){
        if(snake[i].x===snake[0].x && snake[i].y===snake[0].y){
            gameclosesound.play()
            return true;
        }
    }
    // If you bump into the wall
        if(snake[0].x>=18 || snake[0].x<=0 ||snake[0].y>=18 || snake[0].y<=0){
            gameoversound.play()
            return true;
        }  

    
}
function gameEngine(){
    //Part 1: Updating the snake array and food
    if(isCollaide(snakeArr)){
        gameoversound.play()
        musicsound.pause()
        inputDir={x:0,y:0};
        alert("Game Over. Press any key to play again ")
        snakeArr=[{x:13,y:15}];
        gameoversound.pause()
        musicsound.play()
        score=0;

    }
    //If you have eatten the food , increment the score and regenerate the food
    if(snakeArr[0].y===food.y && snakeArr[0].x===food.x){
        foodsound.play()
        snakeArr.unshift({x:snakeArr[0].x + inputDir.x ,y:snakeArr[0].y + inputDir.y})
        score=score+5
        scorebox.innerHTML="Score: "+score;
        let a=2;
        let b=16;
        food={x:Math.round(a+(b-a)*Math.random()),y:Math.round(a+(b-a)*Math.random())}
    }
    //Moving the snake
    for (let i=snakeArr.length-2; i>=0;i--){ // for decrementing the for loop
        snakeArr[i+1]={...snakeArr[i]};

    }
    snakeArr[0].x+=inputDir.x;
    snakeArr[0].y+=inputDir.y;


    //Part 2: Render the snake and food 
    // Display the snake
    board.innerHTML="";
    snakeArr.forEach((e,index)=>{
        snakeElement=document.createElement('div');
        snakeElement.style.gridRowStart=e.y;
        snakeElement.style.gridColumnStart=e.x;
        if(index==0){
            snakeElement.classList.add('head');
        }
        else{
        snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);

    })
    // display the food
        foodElement=document.createElement('div');
        foodElement.style.gridRowStart=food.y;
        foodElement.style.gridColumnStart=food.x;
        foodElement.classList.add('food')
        board.appendChild(foodElement);

}
 
// Main logic starts here
window.requestAnimationFrame(main);
window.addEventListener('keydown',e=>{
    inputDir={x:0,y:1} //Start the game
    gameoversound.pause()
    musicsound.play()
    movesound.play()
    switch (e.key) {
        case "ArrowUp":
            console.log("ArrowUp")
            inputDir.x=0;
            inputDir.y=-1;
            break;

        case "ArrowDown":
            console.log("ArrowDown")
            inputDir.x=0;
            inputDir.y=1;
            break;

        case "ArrowLeft":
            console.log("ArrowLeft")
            inputDir.x=-1;
            inputDir.y=0;
            break;

        case "ArrowRight":
            console.log("ArrowRight")
            inputDir.x=1;
            inputDir.y=0;
            break;
    
        default:
            break;
    }


})