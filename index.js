const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
//Defining the output directory and file path for the generated HTML
const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");
//Importing the render function for generating HTML from employee data
const render = require("./src/page-template.js");
// const { default: generate } = require("@babel/generator");

// TODO: Write Code to gather information about the development team members, and render the HTML file.

const teamInfo = []; //initialize empty array to store team members info

// questions for Manager details
function managerPrompt() {
  inquirer
    .prompt([
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
    .then((managerData) => {
      // Create a new Manager object and push it to teamInfo Array
      const newManager = new Manager(
        managerData.name,
        managerData.id,
        managerData.email,
        managerData.officeNumber
      );
      teamInfo.push(newManager);
      // Send user back to the menu for more input
      promptUserType();
    });
}

function promptUserType() {
  inquirer
    .prompt([
      //employer type
      {
        type: "list",
        name: "employerType",
        message: "Select employer type you want to add to the team?",
        choices: ["Engineer", "Intern", "I finished entering my team info"],
      },
    ])
    .then((response) => {
      // call the correct function based on user choice
      console.log(response.employerType);
      switch (response.employerType) {
        case "Engineer":
          engineerPrompt();
          break;
        case "Intern":
          internPrompt();
          break;
        case "I finished entering my team info":
          // Generate the HTML and finish the process
          generateHTML();
          break;
      }
    });
}
// Similar prompts and actions for Engineer and Intern
function engineerPrompt() {
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
    .then((engineerData) => {
      // Create a new Manager object and push it to teamInfo Array
      const newEngineer = new Engineer(
        engineerData.name,
        engineerData.id,
        engineerData.email,
        engineerData.officeNumber
      );
      teamInfo.push(newEngineer);
      // Send user back to the menu for more input
      promptUserType();
    });
}
function internPrompt() {
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
    .then((internData) => {
      // Create a new Manager object and push it to teamInfo Array
      const newIntern = new Intern(
        internData.name,
        internData.id,
        internData.email,
        internData.officeNumber
      );
      teamInfo.push(newIntern);
      // Send user back to the menu for more input
      promptUserType();
    });
}
// Generate HTML page based on teamArray and write it to a file
function generateHTML() {
  const htmlPage = render(teamInfo);
  fs.writeFile(outputPath, htmlPage, (err) =>
    err
      ? console.log(err)
      : console.log("HTML file has been created in the lib/folder")
  );
}
//start prompt for manager

managerPrompt();
