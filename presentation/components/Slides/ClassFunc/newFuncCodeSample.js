function CreateUser(name, userName) {
    this.name = name;
    this.userName = userName;
}

CreateUser.prototype.sayHi = function () {
    console.log(`Hi, I'm ${this.name}`)
}

const user1 = new CreateUser('Sagiv', 'sag1v');
const user2 = new CreateUser('John', 'john77');
user1.sayHi(); // Hi, I'm Sagiv
user2.sayHi(); // Hi, I'm John
//