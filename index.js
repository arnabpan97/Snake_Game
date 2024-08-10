let inputDir = { x: 0, y: 0 };
const gmusic = new Audio('game_music.mp3');
const gover = new Audio('game_over.mp3')
const fmusic = new Audio('eat_food.mp3')
let score=0;
let speed = 10;
let ltime = 0;
let snakeArr = [{ x: 20, y: 20 }];
food = { x: 15, y: 15 }

// make function
function main(ctime) {
    window.requestAnimationFrame(main);
    // console.log(ctime);
    if ((ctime - ltime) / 1000 < 1 / speed) {
        return;
    }
    ltime = ctime;
    gameEngine();
}
function isCollide(snake){
    // if sanke touch his body
    for(let i=1;i<snakeArr.length;i++){
        if(snake[i].x===snake[0].x && snake[i].y===snake[0].y){
            return true;
        }
    }
    if(snake[0].x>=30 || snake[0].x<=0 ||  snake[0].y>=30 || snake[0].y<=0){
        return true;
    }
    return false;
}
function gameEngine() {
    // update snake
    
    if(isCollide(snakeArr)){
        gmusic.pause();
        gover.play();
        inputDir={x:0,y:0};
        alert("Game Over.........");
        snakeArr = [{ x: 20, y: 20 }];
        sc.innerHTML="Score: 0"
        gmusic.play();
        score=0;
    }
    // if food eaten
    if(snakeArr[0].y==food.y && snakeArr[0].x==food.x){
        fmusic.play()
        score+=1;
        if(score>hiscoreval){
            hiscoreval=score;
            localStorage.setItem("hiscore",JSON.stringify(hiscoreval))
            hscore.innerHTML="High Score: "+hiscoreval;
        }
        sc.innerHTML="Score: "+score;
        snakeArr.unshift({x:snakeArr[0].x+inputDir.x,y:snakeArr[0].y+inputDir.y})
        let a=2;
        let b=28;
        food={x:Math.round(a+(b-a)*Math.random()),y:Math.round(a+(b-a)*Math.random())};
    }
    // move snake
    for (let i = snakeArr.length-2; i >=0; i--) { 
        snakeArr[i+1]={...snakeArr[i]}
    }
    snakeArr[0].x+=inputDir.x;
    snakeArr[0].y+=inputDir.y;

    // for snake
    bord.innerHTML = "";
    snakeArr.forEach((e, index) => {
        snakeEle = document.createElement('div')
        snakeEle.style.gridRowStart = e.y;
        snakeEle.style.gridColumnStart = e.x;
        if (index == 0) {
            snakeEle.classList.add('head')
        } else {
            snakeEle.classList.add('snake')
        }

        bord.appendChild(snakeEle)
    })
    // for food
    foodEle = document.createElement('div')
    foodEle.style.gridRowStart = food.y;
    foodEle.style.gridColumnStart = food.x;
    foodEle.classList.add('food')
    bord.appendChild(foodEle)
}


















// main logic
let hiscore=localStorage.getItem("hiscore")
if(hiscore==null){
    hiscoreval=0;
    localStorage.setItem("hiscore",JSON.stringify(hiscoreval))
}else{
    hiscoreval=JSON.parse(hiscore)
    hscore.innerHTML="High Score: "+hiscore;
}
window.requestAnimationFrame(main);
window.addEventListener('keydown', e => {
    inputDir = { x: 0, y: 1 }
    gmusic.play();
    switch (e.key) {
        case 'ArrowUp':
            console.log("ArrowUp")
            inputDir.x = 0
            inputDir.y = -1
            break;
        case 'ArrowDown':
            console.log("ArrowDown")
            inputDir.x = 0
            inputDir.y = 1
            break;
        case 'ArrowLeft':
            console.log("ArrowLeft")
            inputDir.x = -1
            inputDir.y = 0
            break;
        case 'ArrowRight':
            console.log("ArrowRight")
            inputDir.x = 1
            inputDir.y = -0
            break;

        default:
            break;
    }

})