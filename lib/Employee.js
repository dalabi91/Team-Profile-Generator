// TODO: Write code to define and export the Employee class

class Employee {
  constructor(name, id, email) {
    this.name = name;
    this.id = id;
    this.email = email;
  }

  getName() {
    return this.name;
  }

  getName() {
    return this.name;
  }

  getId() {
    return this.id;
  }

  getEmail() {
    return this.email;
  }

  getRole() {
    return this.title;
  }
}

const don = new Employee("Donnahue", 1, "don@george.com");
const deb = new Employee("Deborah", 1, "deb@alabi.com");
console.log(don.getName());
console.log(deb.getName());

module.exports = Employee;
