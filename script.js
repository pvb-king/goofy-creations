
const winSound = new Audio("win.wav")
const lostSound = new Audio("lost.mp3");
const drawSound = new Audio("draw.mp3");
let score = 0;
let draw = 0;
let highscore = 0;
let computerScore = 0;
let roundCount = 0;

let difficulty = 'easy';
let lastUserMove = null;

const winCounter = document.querySelector('.wins');
const lossCounter = document.querySelector('.losses');
const drawCounter = document.querySelector('.draws');

function setDifficulty(level) {
    let ez = document.querySelector(".easyMode");
    let mid = document.querySelector(".midMode");
    let hard = document.querySelector(".hardMode");
    
    difficulty = level;

    ez.classList.remove("modeSelected");
    mid.classList.remove("modeSelected");
    hard.classList.remove("modeSelected");

    if (level === 'easy') {
        ez.classList.add("modeSelected");
    } else if (level === 'medium') {
        mid.classList.add("modeSelected");
    } else if (level === 'hard') {
        hard.classList.add("modeSelected");
    }
}



function play(userMove) {
    const moves = ['rock', 'paper', 'scissor'];
    if (difficulty === 'easy') {
        computerMove = moves[Math.floor(Math.random() * 3)];
    } 
    else if (difficulty === 'medium') {
        if (Math.random() < 0.7 || !lastUserMove) {
            computerMove = moves[Math.floor(Math.random() * 3)];
        } else {
            computerMove = counterMove(lastUserMove);
        }
    } 
    else if (difficulty === 'hard') {
        if (!lastUserMove) {
            computerMove = moves[Math.floor(Math.random() * 3)];
        } else {
            computerMove = counterMove(lastUserMove);
        }
    }


    document.querySelector('.userMoveJS').innerHTML = userMove;
    document.querySelector('.computerMoveJS').innerHTML = computerMove;
    document.querySelector('.roundDetails').innerHTML = `Round - ${++roundCount}`;

    const userDiv = document.querySelector('.userMoveDiv');
    const compDiv = document.querySelector('.computerMoveDiv');

    if (
        (userMove === 'rock' && computerMove === 'scissor') ||
        (userMove === 'paper' && computerMove === 'rock') ||
        (userMove === 'scissor' && computerMove === 'paper')
    ) 
    {
        score++;
        document.getElementById('winCount').innerHTML = score;
        winSound.play();
        document.querySelector('.userScore').innerHTML = score;
        userDiv.classList.add('winAnimation');
        compDiv.classList.add('lostAnimation');
        
    } 


    else if (userMove !== computerMove) {
        computerScore++;
        lostSound.play();
        document.getElementById('lossCount').innerHTML = computerScore;
        document.querySelector('.computerScore').innerHTML = computerScore;
        compDiv.classList.add('winAnimation');
        userDiv.classList.add('lostAnimation');
    }


    else if (userMove===computerMove){
        userDiv.classList.add('drawAnimation');
        compDiv.classList.add('drawAnimation');            
        drawSound.play()
        draw++;
        document.getElementById('drawCount').innerHTML = draw;

    }

    // Reset animation classes after delay
    setTimeout(() => {
        userDiv.classList.remove('winAnimation', 'lostAnimation','drawAnimation');
        compDiv.classList.remove('winAnimation', 'lostAnimation','drawAnimation');
    }, 500);

    // Update high score
    if (score > highscore) {
        highscore = score;
        document.querySelector('.highscoreNumber').innerHTML = highscore;
    }
    lastUserMove = userMove;
}

function reset() {
    if (score > highscore) {
        highscore = score;
        document.querySelector('.highscoreNumber').innerHTML = highscore;
    }

    score = 0;
    computerScore = 0;
    roundCount = 0;
    document.querySelector('.userScore').innerHTML = score;
    document.querySelector('.computerScore').innerHTML = computerScore;
    document.querySelector('.roundDetails').innerHTML = 'Round - 0';

    draw = 0;
    document.getElementById('winCount').innerHTML = score;
    document.getElementById('lossCount').innerHTML = computerScore;
    document.getElementById('drawCount').innerHTML = draw;


}

function counterMove(move) {
    if (move === 'rock') return 'paper';
    if (move === 'paper') return 'scissor';
    if (move === 'scissor') return 'rock';
}

