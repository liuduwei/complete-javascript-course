'use strict';

// * consturctor

const Person = function (firstName, lastName) {
  this.firstName = firstName;
  this.lastName = lastName;
};

// 1. New {} be created
// 2. function is called, this = {};
// 3. {} linked to prototype; {}.__proto__ == constructor.prototype
// 4. function automaticlly return {};

const liu = new Person('liu', 'duwei');
const cheng = new Person('cheng', 'hongyi');

Person.prototype.sayName = function () {
  console.log(this.firstName);
};
Person.prototype.hometown = 'jy';
liu.sayName();

console.log(Person.prototype.isPrototypeOf(liu));
console.log(Person.prototype.isPrototypeOf(cheng));
console.log(Person.prototype.isPrototypeOf(Person));

console.log(liu.hasOwnProperty('firstName'));
console.log(liu.hasOwnProperty('hometown'));

const student = function (major, firstName, lastName) {
  Person.call(this, firstName, lastName);
  this.major = major;
};

student.prototype = Object.create(Person.prototype);
const mike = new student('Computer Science', 'mike', 'chou');
console.log(mike);
mike.sayName();

class PersonCl {
  constructor(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
  }

  sayName() {
    console.log(`My name is ${this.firstName}${this.lastName}`);
  }

  set address(address) {
    this._address = address;
    console.log('set address success');
  }

  get address() {
    return `My address is ${this._address}`;
  }
}
