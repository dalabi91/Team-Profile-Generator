const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./src/page-template.js");
const { default: generate } = require("@babel/generator");

// TODO: Write Code to gather information about the development team members, and render the HTML file.

//class containing all questions
class Prompt {
  constructor() {
    this.teamInfo = []; //initialse empty array to store team members info
  }
  //method to get all employee array of all object
  getTeamInfo() {
    return this.teamInfo;
  }
  //array of question for members

  question() {
    inquirer
      .prompt({
        //employer type
        type: "list",
        name: "employerType",
        message: "Select employer type to add to team?",
        choices: [
          "Manager",
          "Engineer",
          "Intern",
          "I finished entering my team info",
        ],
      })
      .then(({ employeeType }) => {
        // prompt for specific employee details based on the user's choice,
        if (employeeType === "Manager") {
          inquirer
            .prompt([
              // questions for Manager details
              //Name
              {
                type: "List",
                name: "name",
                message: "Please enter manager's name",
                validate: (nameInput) => {
                  if (nameInput) {
                    return true;
                  } else {
                    console.log("Please enter manager's name!");
                    return false;
                  }
                },
              },

              //Employee ID
              {
                type: "number",
                name: "id",
                message: "Please enter manager's id",
                validate: (idInput) => {
                  if (idInput) {
                    return true;
                  } else {
                    console.log(
                      "Please enter the correct manager's id, this should be a number!"
                    );
                    return false;
                  }
                },
              },

              //Email address
              {
                type: "input",
                name: "email",
                message: "Please enter manager's email",
                validate: (emailInput) => {
                  if (emailInput) {
                    return true;
                  } else {
                    console.log("Please enter the correct manager's email!");
                    return false;
                  }
                },
              },

              //Office number
              {
                type: "number",
                name: "officeNumber",
                message: "Please enter manager's office Number",
                validate: (idInput) => {
                  if (idInput) {
                    return true;
                  } else {
                    console.log(
                      "Please enter the correct manager's office Number, this should be a number!"
                    );
                    return false;
                  }
                },
              },
            ])
            .then((dataTemplate) => {
              // Create a new Manager object and push it to teamInfo Array
              const newManager = new Manager(
                dataTemplate.name,
                dataTemplate.id,
                dataTemplate.email,
                dataTemplate.officeNumber
              );
              this.teamInfo.push(newManager);
              // Send user back to the menu for more input
              this.question();
            });

          // Similar prompts and actions for Engineer and Intern
        } else if (employeeType === "Engineer") {
          inquirer
            .prompt([
              //Name
              {
                type: "input",
                name: "name",
                message: "Please enter engineer's name",
                validate: (nameInput) => {
                  if (nameInput) {
                    return true;
                  } else {
                    console.log("Please enter the correct engineer's name!");
                    return false;
                  }
                },
              },

              {
                type: "number",
                name: "id",
                message: "Please enter engineer's id",
                validate: (idInput) => {
                  if (idInput) {
                    return true;
                  } else {
                    console.log(
                      "Please enter the correct engineer's id, this should be a number!"
                    );
                    return false;
                  }
                },
              },

              //Email address
              {
                type: "input",
                name: "email",
                message: "Please enter engineer's email",
                validate: (emailInput) => {
                  if (emailInput) {
                    return true;
                  } else {
                    console.log("Please enter the correct engineer's email!");
                    return false;
                  }
                },
              },

              //Office number
              {
                type: "number",
                name: "officeNumber",
                message: "Please enter engineer's office Number",
                validate: (idInput) => {
                  if (idInput) {
                    return true;
                  } else {
                    console.log(
                      "Please enter the correct engineer's office Number, this should be a number!"
                    );
                    return false;
                  }
                },
              },
            ])
            //pushes engineer;s data into teamInfo array
            .then((dataTemplate) => {
              // Create a new Manager object and push it to teamInfo Array
              const newEngineer = new Engineer(
                dataTemplate.name,
                dataTemplate.id,
                dataTemplate.email,
                dataTemplate.officeNumber
              );
              this.teamInfo.push(newEngineer);
              // Send user back to the menu for more input
              this.question();
            });
        } else if (employeeType === "Intern") {
          inquirer
            .prompt([
              //Name
              {
                type: "input",
                name: "name",
                message: "Please enter Intern's name",
                validate: (nameInput) => {
                  if (nameInput) {
                    return true;
                  } else {
                    console.log("Please enter the correct Intern's name!");
                    return false;
                  }
                },
              },

              {
                type: "number",
                name: "id",
                message: "Please enter Intern's id",
                validate: (idInput) => {
                  if (idInput) {
                    return true;
                  } else {
                    console.log(
                      "Please enter the correct Intern's id, this should be a number!"
                    );
                    return false;
                  }
                },
              },

              //Email address
              {
                type: "input",
                name: "email",
                message: "Please enter Intern's email",
                validate: (emailInput) => {
                  if (emailInput) {
                    return true;
                  } else {
                    console.log("Please enter the correct Intern's email!");
                    return false;
                  }
                },
              },

              //Office number
              {
                type: "number",
                name: "officeNumber",
                message: "Please enter Intern's office Number",
                validate: (idInput) => {
                  if (idInput) {
                    return true;
                  } else {
                    console.log(
                      "Please enter the correct Intern's office Number, this should be a number!"
                    );
                    return false;
                  }
                },
              },
            ])
            //pushes intern's data into teamInfo array
            .then((dataTemplate) => {
              // Create a new Manager object and push it to teamInfo Array
              const newIntern = new Intern(
                dataTemplate.name,
                dataTemplate.id,
                dataTemplate.email,
                dataTemplate.officeNumber
              );
              this.teamInfo.push(newIntern);
              // Send user back to the menu for more input
              this.question();
            });
        } else if (employeeType === "I finished entering my team info") {
          // Generate HTML page based on teamArray and write it to a file
          const htmlPage = render(this.getTeamInfo());
          fs.writeFile(`./lib/generatedIndex.html`, htmlPage, (err) =>
            err
              ? console.log(err)
              : console.log("HTML file has been created in the lib/folder")
          );
        }
      });
  }
}

// Activates prompts in
const prompt = new Prompt();
prompt.question();

module.exports = Prompt;
