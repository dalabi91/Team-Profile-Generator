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
              // Prompts for Manager details
            ])
            .then((dataTemplate) => {
              // Create a new Manager object and push it to teamInfo Array
              // Send user back to the menu for more input
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
