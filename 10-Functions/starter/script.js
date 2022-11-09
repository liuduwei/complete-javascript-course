'use strict';

// const greet = function (greet) {
//   return function (name) {
//     console.log(`${greet} ${name}`);
//   };
// };

// const greetHey = greet('hey');

// greetHey('liuduwei');
// greet('cao')('tt');

// const arrowGreet = greet => {
//   return name => {
//     console.log(`${greet} ${name}`);
//   };
// };

// const arrowGreetHi = arrowGreet('hi');
// arrowGreetHi('tt');

const countTex = (value, rate) => value + value * rate;

console.log(countTex(1, 3));

const countTexRate = countTex.bind(null, 0.32);
console.log(countTexRate(1));

const orderContTextRate = function (rate) {
  return function (value) {
    return value + value * rate;
  };
};

const addRate1 = orderContTextRate(0.2);
console.log(addRate1(3));
