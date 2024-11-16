let gameSeq = [];
let userSeq = [];
let btns = ["yellow","red","green","blue"];

let started = false;
let level = 0;
let updtLevel = 0;
let h1 = document.querySelector('h1');
let h3 = document.querySelector('h3');
document.addEventListener('keypress', function(){
    if(started == false){
        console.log("Game started");
        started = true;
        levelUp();
    }
 });
 
 function gameFlash(btn){
    btn.classList.add('flash');
    setTimeout( function(){
        btn.classList.remove('flash');
    }, 250);
 }

 function userFlash(btn){
    btn.classList.add('userflash');
    setTimeout( function(){
        btn.classList.remove('userflash');
    }, 250);
 }

 function levelUp(){
    userSeq = [];
    level++;
    h3.innerText = `Level ${level}`;

    let randIdx = Math.floor(Math.random()*3);
    let randColor = btns[randIdx];
    let randBtn = document.querySelector(`.${randColor}`);
    gameSeq.push(randColor);
    console.log(gameSeq);
    gameFlash(randBtn);
 }

function checkAns(idx){
    
    if(userSeq[idx] === gameSeq[idx]){
        if(userSeq.length === gameSeq.length){
           setTimeout(levelUp,500);
        }
    }else{
        h3.innerHTML = `Game over! Your score was <b>${level}</b> <br>Press any key to start the game again.`;
        document.querySelector('body').style.backgroundColor = 'red';
        setTimeout( function(){
            document.querySelector('body').style.backgroundColor = 'white';
        }, 120);
        highScore();
        reset();
    }
}

function highScore(){
    if(level > updtLevel){
        updtLevel = level;
        h1.innerHTML = `Highest Score is ${level}`;
    }else{
        h1.innerHTML = `Highest Score is ${updtLevel}`
    }
}

function btnPress(){
    let btn=this;
    userFlash(btn);

    userColor = btn.getAttribute("id");
    userSeq.push(userColor);

    checkAns(userSeq.length-1);
}

let allBtns = document.querySelectorAll('.btn');
for(btn of allBtns){
    btn.addEventListener('click', btnPress);
}

function reset(){
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}