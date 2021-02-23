const container = document.querySelector('.gameBoard');
const scoreBoard = document.querySelector('.score');
const btnStart = document.querySelector('.btnStart');

let lasthideout = false; //last spot person popup
let gameOver = false; //is game play
let score;

btnStart.addEventListener('click', startGame);

function startGame(){
    //console.log('clicked');
    btnStart.style.display = 'none';
    makeGameBoard();
    startBadGuys();
    score = 0;
    scoring();
}

function startBadGuys(){
    let hideout = randomUp();
    let temp = Math.floor(Math.random()*4) + 1;
    let tempClass = temp > 1 ? 'up': 'up2';    
    
    hideout.classList.add(tempClass);
    const time = Math.round(Math.random()*(1500 - 250) +  250); //set time 1.5s, 0.25s
    setTimeout(function(){
        hideout.classList.remove(tempClass);
        if(!gameOver) startBadGuys();
    }, time);    
}

function randomUp(){
    let hideouts = document.querySelectorAll('.hideout');
    const idx = Math.floor(Math.random()*hideouts.length); //get random value
    //from hideouts number
    if(hideouts[idx].badGuyId === lasthideout){
        return randomUp();
    }
    lasthideout = hideouts[idx].badGuyId;
    return hideouts[idx];
    console.log(idx);
    console.log(hideouts)
}



function makeGameBoard(){
    let hideOutsCreated = 8;
    container.innerHTML = '';
    for(let x = 0; x<hideOutsCreated; x++){
        console.log('making');
        let div = document.createElement('div');
        div.setAttribute('class', 'hideout');
        div.badGuyId = x;
        //create els
        let badGuy = document.createElement('div');
        badGuy.setAttribute('class', 'badGuy');
        badGuy.onclick = myShot;
        div.appendChild(badGuy);
        let friend = document.createElement('div');
        friend.setAttribute('class', 'friend');
        friend.onclick = myShot2;
        div.appendChild(friend);
        let bricks = document.createElement('div');
        bricks.setAttribute('class', 'bricks');
        div.appendChild(bricks);
        container.appendChild(div);
    }
}

function scoring(){
    scoreBoard.innerHTML = score;
    let message = score > 10 ? 'You Win' : 'You Lose';
    if(score > 10 || score <0){
        gameOver = true;
        btnStart.style.display = 'block';
        console.log(message);
    }
}

function myShot(){
    console.log('HIT');
    score++;
    this.parentNode.classList.remove('up');
    scoreBoard.innerHTML = score;
    scoring();
}

function myShot2(){
    console.log('WRONG ONE');
    score = score -5;;
    this.parentNode.classList.remove('up2');
    scoreBoard.innerHTML = score;
    scoring();
}