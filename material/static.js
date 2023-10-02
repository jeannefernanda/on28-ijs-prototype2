class Animal {
    type;
    name;
    age;
    hungry;

    static animals = [];

    constructor(type, name, age, hungry) {
        this.type = type;
        this.name = name;
        this.age = age;
        this.hungry = hungry;
        this.constructor.animals.push({ name, type, hungry });
        //Animal.animals.push(name);
    }

    eat(value) {
        console.log(`O animal ${this.name} está comendo`);
        this.hungry -= value;

        const indexFound = Animal.animals.findIndex(animal => animal.name === this.name);
        Animal.animals[indexFound].hungry = this.hungry;
    }

    static nextToEat() {
        const sortedAnimals = Animal.animals.sort((a, b) => b.hungry - a.hungry);
        console.log(`O próximo que precisa comer é ${sortedAnimals[0].name}`)
    }
}

const animal1 = new Animal("cachorro", "Aslam", 5, 50);
const animal2 = new Animal("gato", "Pipoca", 2, 100);
const animal3 = new Animal("cachorro", "Huck", 9, 40)
console.log(Animal.animals)

animal1.eat(10);
animal2.eat(5);
animal3.eat(15);
console.log(animal1);
console.log(animal2);
console.log(animal3);
Animal.nextToEat();

animal2.eat(60);
console.log(animal1);
console.log(animal2);
console.log(animal3);
Animal.nextToEat();

animal1.eat(39);
console.log(animal1);
console.log(animal2);
console.log(animal3);
Animal.nextToEat();

animal2.eat(32);
console.log(animal1);
console.log(animal2);
console.log(animal3);
Animal.nextToEat();