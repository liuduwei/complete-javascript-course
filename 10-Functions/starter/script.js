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

// const countTex = (value, rate) => value + value * rate;

// console.log(countTex(1, 3));

// const countTexRate = countTex.bind(null, 0.32);
// console.log(countTexRate(1));

// const orderContTextRate = function (rate) {
//   return function (value) {
//     return value + value * rate;
//   };
// };

// const addRate1 = orderContTextRate(0.2);
// console.log(addRate1(3));

const passenger1 = function scopePassenger() {
  let passenger = 0;
  return function () {
    passenger += 1;
    console.log(`${passenger} passenger `);
  };
};

let passenger = 10;

const book = passenger1();
book();
book();
book();

console.dir(book);

let f;
const g = function () {
  const a = 23;
  f = function () {
    console.log(a * 2);
  };
};

g();
f();

const h = function () {
  const b = 24;
  f = function () {
    console.log(b * 2);
  };
};

h();
f();

const boardPassenger = function (n, wait) {
  const passengerGroup = n / 3;

  setTimeout(function () {
    console.log(`${passengerGroup} board all done`);
  }, wait * 1000);
  (function () {
    console.log(`${n} is boarding`);
  })();
};

boardPassenger(180, 3);
