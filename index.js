const inquirer = require("inquirer");

function init() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "title",
        message: "What is this projects title?",
      },
      {
        type: "input",
        name: "description",
        message: "What is this projects description?",
      },
      {
        type: "input",
        name: "install",
        message: "How do others install this project?",
      },
      {
        type: "input",
        name: "usage",
        message: "How do you use this project?",
      },
      {
        type: "list",
        name: "license",
        message: "Select the license for this project:",
        choices: [
          "Apache 2.0",
          "Boost 1.0",
          "BSD 3-Clause",
          "BSD 2-Clause",
          "Creative Commons 1.0",
          new inquirer.Separator(),
          "Attribution 4.0",
          "Attribution ShareAlike 4.0",
          "Attribution NonCommercial 4.0",
          "Attribution NoDerivates 4.0",
          "Attribution NonCommercialShareAlike 4.0",
          "Attribution NonCommercialNoDerivatives",
          new inquirer.Separator(),
          "GNU GPL v3",
          "GNU GPL v2",
          "GNU AGPL v3",
          "GNU LGPL v3",
          "GNU FDL v1.3",
          new inquirer.Separator(),
          "Ecipse Public License 1.0",
          "IBM",
          "ISC",
          "MIT",
          "Mozilla",
          "ODC BY",
        ],
      },
      {
        type: "input",
        name: "contribution",
        message: "How can others contribute to this project?",
      },
      {
        type: "input",
        name: "tests",
        message: "How do you perform tests?",
      },
      {
        type: "input",
        name: "username",
        message:
          "What is you github user name? (ex: https://github.com/<username>)",
      },
      {
        type: "input",
        name: "contact",
        message: "What is your email for contacting?",
      },
    ])
    .then((answers) => {
      console.log(answers);

      // Save collected answers
      ClearReadMe();

      // Savefile uses an async function meaning all text has to go at once.
      SaveFile(
        "# " +
          Capitalize(answers.title) +
          "\n\n## Project Description <a name='project-desc'></a>\n\n" +
          answers.description +
          "\n\n## Table of Contents\n\n" +
          "* [Project Description](#project-desc)\n" +
          "* [Installation](#installation)\n" +
          "* [Usage](#usage)\n" +
          "* [License](#license)\n" +
          "* [Contribution Guidelines](#contributing)\n" +
          "* [Tests](#tests)\n" +
          "* [Questions](#questions)\n" +
          "\n\n## Installation <a name='installation'></a>\n\n" +
          answers.install +
          "\n\n## Usage <a name='usage'></a>\n\n" +
          answers.usage +
          "\n\n## License <a name='license'></a>\n\n" +
          answers.license +
          "\n\n## Contribution Guidelines <a name='contributing'></a>\n\n" +
          answers.contribution +
          "\n\n## Tests <a name='tests'></a>\n\n" +
          answers.tests +
          "\n\n## Questions <a name='questions'></a>\n\n" +
          "[My Github:" +
          answers.username +
          "](https://github.com/" +
          answers.username +
          ")" +
          "\n email: " +
          answers.contact
      );
    })
    .catch((error) => {
      if (error.isTtyError) {
        // Prompt couldn't be rendered in the current environment
        console.log("ERR: 001." + error);
      } else {
        // Something else went wrong
        console.log("ERR: 002." + error);
      }
    });
}

const fs = require("fs");

// Runs the prompts
init();

// Empty the read start with title
ClearReadMe = () => {
  try {
    fs.writeFile("README.md", "", function (err) {
      if (err) throw err;
    });
  } catch (err) {
    console.log(err);
  }
};

// Append text to file
SaveFile = (ans) => {
  try {
    fs.appendFile("README.md", ans, function (err) {
      if (err) throw err;
    });
  } catch (err) {
    console.log(err);
  }
};

// Capitalize title
Capitalize = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};
