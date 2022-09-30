'use strict';

// Player 1
const player1Side = document.querySelector('.player--0');
const player1Name = document.querySelector('#name--0');
let player1currentPoints = document.querySelector('#current--0');
let player1TotalScore = document.querySelector('#score--0');

// Player 2
const player2Side = document.querySelector('.player--1');
const player2Name = document.getElementById('name--1');
let player2currentPoints = document.getElementById('current--1');
let player2TotalScore = document.querySelector('#score--1');

// Game controls / buttons
const dice = document.querySelector('.dice');
const holdBtn = document.querySelector('.btn--hold');
const restartBtn = document.querySelector('.btn--restart');

// Holds each player's scores, starting with player 1
const playerScores = [0, 0];

let currentPoints = 0;
let roll = 1;
let activePlayer = 0;
let winner;

// Change player turn handler
const switchTurn = () => {
    document.querySelector(`#current--${activePlayer}`).textContent = 0;

    activePlayer = activePlayer === 0 ? 1 : 0;
    player1Side.classList.toggle('player--active');
    player2Side.classList.toggle('player--active');
};

// To create roll effect
const sleepNow = delay => new Promise(resolve => setTimeout(resolve, delay));

async function rollDice() {
    for (let i = 0; i <= 5; i++) {
        roll = Math.ceil(Math.random() * 6);
        document.querySelector('.dice').src = `img/dice-${roll}.webp`;
        await sleepNow(100);
    }

    if (roll === 1) {
        currentPoints = 0;
        document.getElementById(`current--${activePlayer}`).textContent = 0;
        switchTurn();
    } else {
        currentPoints += roll;
    }

    document.querySelector(`#current--${activePlayer}`).textContent =
        currentPoints;
}

const hold = () => {
    playerScores[activePlayer] += currentPoints;
    currentPoints = 0;
    document.querySelector(`#score--${activePlayer}`).textContent =
        playerScores[activePlayer];

    if (playerScores[activePlayer] >= 100) {
        dice.classList.add('hidden');
        holdBtn.classList.add('hidden');

        document
            .querySelector(`.player--${activePlayer}`)
            .classList.add('player--winner');
        document
            .querySelector(`.player--${activePlayer}`)
            .classList.remove('player--active');
        winner = activePlayer;
        if (winner === 0) {
            player2Side.classList.add('player--loser');
        } else {
            player1Side.classList.add('player--loser');
        }
    } else {
        switchTurn();
    }
};

const restart = function () {
    activePlayer = 0;
    currentPoints = 0;
    playerScores[0] = 0;
    playerScores[1] = 0;
    player1TotalScore.textContent = 0;
    player1currentPoints.textContent = 0;
    player2currentPoints.textContent = 0;
    player2TotalScore.textContent = 0;

    document.querySelector('.player--0').classList.add('player--active');
    document.querySelector('.player--1').classList.remove('player--active');
    document.querySelector('.player--0').classList.remove('player--winner');
    document.querySelector('.player--1').classList.remove('player--winner');
    player1Side.classList.remove('player--loser');
    player2Side.classList.remove('player--loser');
    dice.classList.remove('hidden');
    holdBtn.classList.remove('hidden');
};

dice.addEventListener('click', rollDice);
holdBtn.addEventListener('click', hold);
restartBtn.addEventListener('click', restart);
