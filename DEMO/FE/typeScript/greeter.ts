// ------------------------
// function greeter(person:String) {
//   return "Hello, " + person;
// }
// let user = 1;
// document.body.innerHTML = greeter(user);

// ------------------------
// interface Person {
//   firstName: string;
//   lastName: string;
// }

// function greeter(person: Person) {
//   return "Hello, " + person.firstName + " " + person.lastName;
// }

// let user = { firstName: 1, lastName: "User" };

// document.body.innerHTML = greeter(user);

// ----------------------------------
// class Student {
//   fullName: string;
//   constructor(public firstName, public middleInitial, public lastName) {
//       this.fullName = firstName + " " + middleInitial + " " + lastName;
//   }
// }

// interface Person {
//   firstName: string;
//   lastName: string;
// }

// function greeter(person : Person) {
//   return "Hello, " + person.firstName + " " + person.lastName;
// }

// let user = new Student("Jane", "M.", "User");

// document.body.innerHTML = greeter(user);

// ----------------------------------------
// enum Color {Red = 1, Green=3, Blue}
// let c: Color = Color.Green;
// console.log(Color)

// -----------------------------------------
// let someValue: any = "this is a string";
// let strLength: number = (someValue as string).length;

// ------------------------
let o = {
  a: "foo",
  b: 12,
  c: "bar"
};
let { a, b } = o;
console.log(a,b)