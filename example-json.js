var person = {
	name: 'balraj',
	age: 24
};
var personJson = JSON.stringify(person);  //object to string

console.log(personJson);
console.log(typeof personJson);

var personObject = JSON.parse(personJson);//string to object

console.log(personObject.name);
console.log(typeof personObject);

 console.log('CHALLANGE AREA');
 var animal = '{"name": "halley"}';

 var animalObject = JSON.parse(animal);

console.log(animalObject);
 animalObject.age = 1;
 animal = JSON.stringify(animalObject);
 console.log(animal);
 console.log(typeof animal);