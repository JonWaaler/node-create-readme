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
          GetLicenseBadge(answers.license) +
          "\n\n## Contribution Guidelines <a name='contributing'></a>\n\n" +
          answers.contribution +
          "\n\n## Tests <a name='tests'></a>\n\n" +
          answers.tests +
          "\n\n## Questions <a name='questions'></a>\n\n" +
          "[Github Profile: " +
          Capitalize(answers.username) +
          "](https://github.com/" +
          answers.username +
          ")" +
          "\nEmail: " +
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

// Return link to image License badge
function GetLicenseBadge(licenseChoise) {
  console.log(licenseChoise);
  switch (licenseChoise) {
    case "Apache 2.0":
      return "[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)";
      break;
    case "Boost 1.0":
      return "[![License](https://img.shields.io/badge/License-Boost%201.0-lightblue.svg)](https://www.boost.org/LICENSE_1_0.txt)";
      break;
    case "BSD 3-Clause":
      return "[![License](https://img.shields.io/badge/License-BSD%203--Clause-blue.svg)](https://opensource.org/licenses/BSD-3-Clause)";
      break;
    case "BSD 2-Clause":
      return "[![License](https://img.shields.io/badge/License-BSD%202--Clause-orange.svg)](https://opensource.org/licenses/BSD-2-Clause)";
      break;
    case "Creative Commons 1.0":
      return "[![License: CC0-1.0](https://img.shields.io/badge/License-CC0%201.0-lightgrey.svg)](http://creativecommons.org/publicdomain/zero/1.0/)";
      break;
    case "Attribution 4.0":
      return "[![License: CC BY 4.0](https://img.shields.io/badge/License-CC%20BY%204.0-lightgrey.svg)](https://creativecommons.org/licenses/by/4.0/)";
      break;
    case "Attribution ShareAlike 4.0":
      return "[![License: CC BY-SA 4.0](https://img.shields.io/badge/License-CC%20BY--SA%204.0-lightgrey.svg)](https://creativecommons.org/licenses/by-sa/4.0/)";
      break;
    case "Attribution NonCommercial 4.0":
      return "[![License: CC BY-NC 4.0](https://img.shields.io/badge/License-CC%20BY--NC%204.0-lightgrey.svg)](https://creativecommons.org/licenses/by-nc/4.0/)";
      break;
    case "Attribution NoDerivates 4.0":
      return "[![License: CC BY-ND 4.0](https://img.shields.io/badge/License-CC%20BY--ND%204.0-lightgrey.svg)](https://creativecommons.org/licenses/by-nd/4.0/)";
      break;
    case "Attribution NonCommercialShareAlike 4.0":
      return "[![License: CC BY-NC-SA 4.0](https://img.shields.io/badge/License-CC%20BY--NC--SA%204.0-lightgrey.svg)](https://creativecommons.org/licenses/by-nc-sa/4.0/)";
      break;
    case "Attribution NonCommercialNoDerivatives":
      return "[![License: CC BY-NC-ND 4.0](https://img.shields.io/badge/License-CC%20BY--NC--ND%204.0-lightgrey.svg)](https://creativecommons.org/licenses/by-nc-nd/4.0/)";
      break;
    case "GNU GPL v3":
      return "[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)";
      break;
    case "GNU GPL v2":
      return "[![License: GPL v2](https://img.shields.io/badge/License-GPL%20v2-blue.svg)](https://www.gnu.org/licenses/old-licenses/gpl-2.0.en.html)";
      break;
    case "GNU AGPL v3":
      return "[![License: AGPL v3](https://img.shields.io/badge/License-AGPL%20v3-blue.svg)](https://www.gnu.org/licenses/agpl-3.0)";
      break;
    case "GNU LGPL v3":
      return "[![License: LGPL v3](https://img.shields.io/badge/License-LGPL%20v3-blue.svg)](https://www.gnu.org/licenses/lgpl-3.0)";
      break;
    case "GNU FDL v1.3":
      return "[![License: FDL 1.3](https://img.shields.io/badge/License-FDL%20v1.3-blue.svg)](https://www.gnu.org/licenses/fdl-1.3)";
      break;
    case "Ecipse Public License 1.0":
      return "[![License](https://img.shields.io/badge/License-EPL%201.0-red.svg)](https://opensource.org/licenses/EPL-1.0)";
      break;
    case "IBM":
      return "[![License: IPL 1.0](https://img.shields.io/badge/License-IPL%201.0-blue.svg)](https://opensource.org/licenses/IPL-1.0)";
      break;
    case "ISC":
      return "[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)";
      break;
    case "MIT":
      return "[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)";
      break;
    case "Mozilla":
      return "[![License: MPL 2.0](https://img.shields.io/badge/License-MPL%202.0-brightgreen.svg)](https://opensource.org/licenses/MPL-2.0)";
      break;
    case "ODC BY":
      return "[![License: ODbL](https://img.shields.io/badge/License-ODbL-brightgreen.svg)](https://opendatacommons.org/licenses/odbl/)";
      break;

    default:
      console.log("ERR: Invalid input");
      break;
  }
}

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
