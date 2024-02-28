const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./src/page-template.js");

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
        } else if (employeeType === "Intern") {
        } else if (employeeType === "I finished entering my team info") {
          // Generate HTML page based on teamArray and write it to a file
        }
      });
  }
}

// Activates prompts in CLI
const prompt = new Prompt();
prompt.questions();

module.exports = Prompt;
