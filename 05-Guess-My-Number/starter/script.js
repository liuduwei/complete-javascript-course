'use strict';

// console.log(document.querySelector(".message").textContent);

// document.querySelector(".number").textContent = 12;
// document.querySelector(".guess").value = 10;
// document.querySelector(".message").textContent = 'congrutulations ��';

// const secretNumber = Math.trunc((Math.random() * 20));
// let guess;

// console.log(Number(document.querySelector('.guess').value));

// document.querySelector('.check').addEventListener('click',
// function () {
// guess = Number(document.querySelector('.guess').value);
// });

const secretNumber = Math.trunc((Math.random() * 20));
let guess;
let score = 20;


document.querySelector('.check').addEventListener('click',
function() {
    guess = Number(document.querySelector('.guess').value);

    if (score > 0) {
      if (guess > secretNumber) {
        document.querySelector('.message').textContent =
          'Your number is to big';
        score--;
      } else if (guess < secretNumber) {
        document.querySelector('.message').textContent =
          'Your number is to small';
        score--;
      } else if (guess === secretNumber) {
        document.querySelector('.message').textContent = 'Congratulations';
        document.querySelector('body').style.backgroundColor = 'green';
        document.querySelector('.number').textContent = secretNumber;
        document.querySelector(
          'h1'
        ).textContent = `Congratulations you win this game, your score is
            ${score} `;
      }
      document.querySelector(
        '.label-score'
      ).textContent = ` 💯 Score: ${score} `;
    } else {
      document.querySelector('h1').textContent = 'sorry you loss the game';
        document.querySelector('body').style.backgroundColor = 'red';
    }
})

