'use strict';
const openingHours = {
  thu: {
    open: 12,
    close: 22,
  },
  fri: {
    open: 11,
    close: 23,
  },
  sat: {
    open: 0, // Open 24 hours
    close: 24,
  },
};

// // Data needed for a later exercise
// const flights =
//   '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

// // Data needed for first part of the section
// const restaurant = {
//   name: 'Classico Italiano',
//   location: 'Via Angelo Tavanti 23, Firenze, Italy',
//   categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
//   starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
//   mainMenu: ['Pizza', 'Pasta', 'Risotto'],
//   openingHours,

//   order(startIndex, mainIndex) {
//     return [this.starterMenu[startIndex], this.mainMenu[mainIndex]];
//   },
//   // arrowOrder: (startIndex, mainIndex) => {
//   //   const self = this;
//   //   [self.starterMenu[startIndex], self.mainMenu[mainIndex]];
//   // },
// };

// //destructure
// const [x, y] = restaurant.order(0, 0);
// // const [a, b] = restaurant.arrowOrder(0, 0);
// console.log(x, y);
// // destruc nesty array

// const nestyArray = [4, 5, [1, 2]];
// const [a, b, [c, d]] = nestyArray;
// console.log(a, b, c, d);

// const menu = [...restaurant.starterMenu, ...restaurant.mainMenu];

// for (const item of menu) console.log(item);

// for (const item of menu.entries()) console.log(item);
// console.log(typeof menu.entries());
// console.log(...menu.entries());
// console.log(String(menu.entries()));

// for (const [i, el] of menu.entries()) console.log(`${i + 1}: ${el}`);

// console.log(restaurant.openingHours?.sts?.open);

// const days = ['mon', 'tue', 'thirs', 'tues', 'fri', 'sat', 'sun'];

// for (const day of days) {
//   // console.log(day);
//   const open = restaurant.openingHours[day]?.open ?? 'closed';
//   console.log(`at ${day}, we open at ${open}`);
// }

// console.log(restaurant.order?.(0, 1)) ?? 'method';
// console.log(restaurant.ordersdfe?.(0, 1) ?? 'method');

// for (const key of Object.keys(openingHours)) {
//   console.log(key);
// }

// for (const [key, { open, close }] of Object.entries(openingHours)) {
//   console.log(key, open, close);
// }

// console.log(typeof Object.values(openingHours));

// for (const { open, close } of Object.values(openingHours)) {
//   console.log(open, close);
// }

const orderSet = new Set(['Create', 'one', 'player', 'array']);

console.log(orderSet);
console.log(orderSet.has('Create'));
orderSet.add('cao');
orderSet.delete('one');
console.log(orderSet);

for (const order of orderSet) {
  console.log(order);
}

const staff = ['liu', 'du', 'wei', 'du'];

const staffUnique = [...new Set(staff)];
console.log(staffUnique);

console.log(new Set(staff).size);

const myMap = new Map([
  [1, 'liu'],
  [2, 'du'],
  [3, 'wei'],
  ['wei', 3],
  ['sdfe', true],
  ['false', false],
]);
console.log(myMap);

const entriseObject = Object.entries(openingHours);
const hoursMap = new Map(Object.entries(openingHours));
console.log(entriseObject);
console.log(hoursMap);
console.log(hoursMap.get('thu'));

console.log(...hoursMap.entries());
console.log(...hoursMap.values());
console.log(...hoursMap.keys());
// set has get delete .size .clear

const user = 'liu du wei';
const weapon = 'knife';

console.log(user.indexOf('du'));
console.log(user.slice(4));
console.log(user.slice(user.indexOf('liu'), user.indexOf('wei')));

// Coding Challenge #1

/* 
We're building a football betting app (soccer for my American friends 😅)!

Suppose we get data from a web service about a certain game (below). In this challenge we're gonna work with the data. So here are your tasks:

1. Create one player array for each team (variables 'players1' and 'players2')
2. The first player in any player array is the goalkeeper and the others are field players. For Bayern Munich (team 1) create one variable ('gk') with the goalkeeper's name, and one array ('fieldPlayers') with all the remaining 10 field players
3. Create an array 'allPlayers' containing all players of both teams (22 players)
4. During the game, Bayern Munich (team 1) used 3 substitute players. So create a new array ('players1Final') containing all the original team1 players plus 'Thiago', 'Coutinho' and 'Perisic'
5. Based on the game.odds object, create one variable for each odd (called 'team1', 'draw' and 'team2')
6. Write a function ('printGoals') that receives an arbitrary number of player names (NOT an array) and prints each of them to the console, along with the number of goals that were scored in total (number of player names passed in)
7. The team with the lower odd is more likely to win. Print to the console which team is more likely to win, WITHOUT using an if/else statement or the ternary operator.

TEST DATA FOR 6: Use players 'Davies', 'Muller', 'Lewandowski' and 'Kimmich'. Then, call the function again with players from game.scored

GOOD LUCK 😀
*/

// const game = {
//   team1: 'Bayern Munich',
//   team2: 'Borrussia Dortmund',
//   players: [
//     [
//       'Neuer',
//       'Pavard',
//       'Martinez',
//       'Alaba',
//       'Davies',
//       'Kimmich',
//       'Goretzka',
//       'Coman',
//       'Muller',
//       'Gnarby',
//       'Lewandowski',
//     ],
//     [
//       'Burki',
//       'Schulz',
//       'Hummels',
//       'Akanji',
//       'Hakimi',
//       'Weigl',
//       'Witsel',
//       'Hazard',
//       'Brandt',
//       'Sancho',
//       'Gotze',
//     ],
//   ],
//   score: '4:0',
//   scored: ['Lewandowski', 'Gnarby', 'Lewandowski', 'Hummels'],
//   date: 'Nov 9th, 2037',
//   odds: {
//     team1: 1.33,
//     x: 3.25,
//     team2: 6.5,
//   },
// };

// const [player1, player2] = game.players;
// const [gk, ...fieldPlayers] = player1;
// const allPlayers = [...player1, ...player2];
// const players1Final = [...player1, 's', 'b', 'c'];
// const {
//   odds: { team1, x: draw, team2 },
// } = game;
// console.log(team1, draw, team2);

// const printGoals = function (...players) {
//   console.log(players);
//   console.log(`${players.length}`);
// };
// printGoals(...game.scored);

// team1 < team2 && console.log(`team1 win`);
// team1 > team2 && console.log(`team2 win`);
