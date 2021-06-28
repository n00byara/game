'use strict';
const score = document.querySelector('.score'), 
    start = document.querySelector('.start'),
    gameArea = document.querySelector('.gameArea'),
    car = document.createElement('div');
car.classList.add('car');


const keys = {
    ArrowUp : false,
    ArrowDown : false,
    ArrowRight : false,
    ArrowLeft : false,
};

const setting = {
    start : false,
    score : 0,
    speed: 3,
    trafic: 3,
};

function getQuantityElements(heightElement){
    return document.documentElement.clientHeight / heightElement + 1 ;
}



start.addEventListener('click', () =>{
    start.classList.add('hide');

    for(let i = 0; i < getQuantityElements(100); i++){
        const line = document.createElement('div');
        line.classList.add('line');
        line.style.top = (i * 100) + 'px';
        line.y = i * 100;
        gameArea.append(line);
    }

    for(let i = 0; i < getQuantityElements(100 * setting.trafic); i++){
        const enemy = document.createElement('div');
        enemy.classList.add('enemy');
        enemy.y = -100 * setting.trafic * (i + 1);
        enemy.style.left = Math.floor(Math.random() * (gameArea.offsetWidth - 50)) + 'px';
        enemy.style.top = enemy.y + 'px';
        //enemy.style.background = 'transparent url("./image/enemy.png") center / cover no-repeat';
        gameArea.append(enemy);
    }

    setting.start = true;
    gameArea.append(car);
    setting.x = car.offsetLeft;
    setting.y = car.offsetTop;
    requestAnimationFrame(playGame);
});

function playGame(){
    if(setting.start){
        moveRoad();
        moveEnemy();
        if(keys.ArrowRight && setting.x < (gameArea.offsetWidth - 50)){
            setting.x += setting.speed;
        } 
        if(keys.ArrowLeft && setting.x > 0){
            setting.x -= setting.speed;
        }
        
        if(keys.ArrowUp && setting.y > 0){
            setting.y -= setting.speed;
        }
        if(keys.ArrowDown && setting.y < (gameArea.offsetHeight - car.offsetHeight)){
            setting.y += setting.speed;
        }

        car.style.left = setting.x + 'px';
        car.style.top = setting.y + 'px';


        requestAnimationFrame(playGame);
    }
    
}


document.addEventListener('keydown', startRun);
document.addEventListener('keyup', stopRun);

function startRun(event){
    event.preventDefault();
    console.log(event.key);
    keys[event.key] = true;
}
function stopRun(event){
    event.preventDefault();
    keys[event.key] = false;
}


function moveRoad(){
    let lines = document.querySelectorAll('.line');

    lines.forEach((line) =>{
        line.y += setting.speed;
        line.style.top = line.y + 'px';

        if(line.y >= document.documentElement.clientHeight){
            line.y = -100;
            
        }
    });
}

function moveEnemy(){
    let enemy = document.querySelectorAll('.enemy');
    enemy.forEach((car) =>{
        car.y += setting.speed / 2;
        car.style.top = car.y + 'px';
        if(car.y >= document.documentElement.clientHeight){
            car.y = -100 * setting.trafic;
            car.style.left = Math.floor(Math.random() * (gameArea.offsetWidth - 50)) + 'px';
        }
    });

    
}



