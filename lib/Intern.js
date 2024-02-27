// TODO: Write code to define and export the Intern class.  HINT: This class should inherit from Employee.

const Employee = require("./Employee");

class Intern extends Employee {
  constructor(name, id, email, school) {
    super(name, id, email);
    this.school = school;
  }

  getSchool() {
    return this.school;
  }
  getRole() {
    return "Intern";
  }
}

const tosin = new Intern("tosin", 3, "tosin@tosin.com", "grace");

console.log(tosin.getSchool());

module.exports = Intern;
