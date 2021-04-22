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
        message: "How do other install this project?",
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
          new inquirer.Separator(),
          "Attribution NonCommercialNoDerivatives",
          "Ecipse Public License 1.0",
          "GNU GPL v3",
          "GNU GPL v2",
          "GNU AGPL v3",
          new inquirer.Separator(),
          "GNU LGPL v3",
          "GNU FDL v1.3",
          "IBM",
          "ISC",
          "MIT",
          new inquirer.Separator(),
          "Mozilla",
          "ODC BY",
        ],
      },
    ])
    .then((answers) => {
      console.log(answers);

      // Save collected answers
      ClearReadMe();
      SaveFile("# " + Capitalize(answers.title));
      SaveFile(
        "\n\n## Project Description <a name='project-desc'></a>\n\n" +
          answers.description
      );
      SaveFile(
        "\n\n## Table of Contents\n\n" +
          "* [Project Description](#project-desc)\n" +
          "* [Installation](#installation)\n" +
          "* [Usage](#usage)\n" +
          "* [License](#license)\n" +
          "* [Contribution Guidelines](#contributing)\n" +
      );
      SaveFile(
        "\n\n## Installation <a name='installation'></a>\n\n" + answers.install
      );
      SaveFile("\n\n## Usage <a name='usage'></a>\n\n" + answers.usage);
      SaveFile("\n\n## License <a name='license'></a>\n\n");
      SaveFile(
        "\n\n## Contribution Guidelines <a name='contributing'></a>\n\n"
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

// Runs the prompts
init();

const fs = require("fs");

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

Capitalize = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};
