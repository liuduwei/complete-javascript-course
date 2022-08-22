'use strict';

// console.log(document.querySelector(".message").textContent);

// document.querySelector(".number").textContent = 12;
// document.querySelector(".guess").value = 10;
// document.querySelector(".message").textContent = 'congrutulations ��';

const secretNumber = Math.trunc((Math.random() * 20));
let guess;

console.log(Number(document.querySelector('.guess').value));

document.querySelector('.check').addEventListener('click',
function () {
guess = Number(document.querySelector('.guess').value);
});


