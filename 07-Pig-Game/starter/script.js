'use strict';

// selecting elements

const player0El = document.querySelector('.player--0'),
  player1El = document.querySelector('.player--1');

const btnRoll = document.querySelector('.btn--roll'),
  btnNew = document.querySelector('.btn--new'),
  btnHold = document.querySelector('.btn--hold');
const diceEl = document.querySelector('.dice');
const score0El = document.querySelector('#score--0'),
  score1El = document.querySelector('#score--1');
const current0El = document.querySelector('#current--0'),
  current1EL = document.querySelector('#current--1');

// string condition
score0El.textContent = 0;
score1El.textContent = 0;
current0El.textContent = 0;
current1EL.textContent = 0;
diceEl.classList.add('hidden');

let score = [0, 0],
  currentScore = 0,
  activePlayer = 0,
  playing = true;

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

//Rolling dice functinoality
btnRoll.addEventListener('click', function () {
  if (playing) {
    // 1.Generate random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;
    console.log(dice);
    // 2.Display dice Roll
    diceEl.src = `dice-${dice}.png`;
    diceEl.classList.remove('hidden');
    // 3.check for rolled 1: if true switch played
    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
      // add to current score
    } else {
      // switch to another player
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    // 1.add current score to total score
    score[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      score[activePlayer];
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    currentScore = 0;
    // 2.check for socre :if >= 100, win, else:switch player
    if (score[activePlayer] >= 10) {
      playing = false;
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
    } else {
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', function () {
  (score0El.textContent = 0), (score1El.textContent = 0);
  player0El.classList.add('player--active');
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove('player--winner');
  playing = true;
});
