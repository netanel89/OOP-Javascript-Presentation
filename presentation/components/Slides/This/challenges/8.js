const logAge = () => {
	console.log(this.age)
}

class User {
	constructor() {
		this.age = 30
	}
	logAge() {
		logAge();
	}
}

const user2 = { age: 20 }
const user = new User();

user.logAge.call(user2);