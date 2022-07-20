'use strict';

// Selecting Elements
const score1 = document.querySelector('#score1');
const score2 = document.querySelector('#score2');
const currentScore1 = document.querySelector('#current-score1')
const currentScore2 = document.querySelector('#current-score2')
const dice = document.querySelector('.dice');
const btnNewGame = document.querySelector('.new-game');
console.log(btnNewGame);
const btnRollDice = document.querySelector('.roll-dice');
const btnHold = document.querySelector('.hold');

let scores = [0, 0];
let currentScore = 0;
let activePlayer = 1;

btnRollDice.addEventListener('click', rollDice);
function rollDice() {
    let roll = Math.floor(Math.random() * 6) + 1;
    console.log(roll);
    dice.src = `dice-${roll}.png`;
    dice.classList.remove('hidden');

    if(roll !== 1){
        currentScore += roll;
        document.getElementById(`current-score${activePlayer}`).textContent = currentScore;
    }
    else{
        currentScore = 0;
        document.getElementById(`current-score${activePlayer}`).textContent = 0;

        switchPlayer();
    }
}

btnHold.addEventListener('click', function() {
    scores[activePlayer - 1] += currentScore;
    document.getElementById(`score${activePlayer}`).textContent = scores[activePlayer - 1];
    document.getElementById(`current-score${activePlayer}`).textContent = 0;
    currentScore = 0;

    if(document.getElementById(`score${activePlayer}`).textContent >= 50){
        console.log(`Player ${activePlayer} wins!!`);
        win();
    }
    else{
        switchPlayer()
    }
})

function win(){
    document.querySelector(`.player${activePlayer}`).classList.add('winner');
    dice.classList.add('hidden');
    btnHold.disabled = true;
    btnRollDice.disabled = true;
}

function switchPlayer() {
    activePlayer = activePlayer === 1 ? 2 : 1;    
    document.querySelector('.player1').classList.toggle('inactive');
    document.querySelector('.player2').classList.toggle('inactive');
}

btnNewGame.addEventListener('click', function() {
    scores = [0, 0];
    score1.textContent = 0;
    score2.textContent = 0;
    currentScore1.textContent = 0;
    currentScore2.textContent = 0;
    dice.classList.add('hidden');
    currentScore = 0;
    activePlayer = 1;
    document.querySelector('.player1').classList.remove('inactive');
    document.querySelector('.player1').classList.remove('winner');
    document.querySelector('.player2').classList.remove('winner');
    document.querySelector('.player2').classList.add('inactive');
    btnHold.disabled = false;
    btnRollDice.disabled = false;
})