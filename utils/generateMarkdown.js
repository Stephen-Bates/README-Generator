// TODO: Create a function that returns a license badge based on which license is passed in
// If there is no license, return an empty string
function renderLicenseBadge(license) {
  if (license === "None") return ''

  return `![License](https://img.shields.io/badge/License-${license.name.replace(/[ _-]/g, c => { return { ' ': '_', '_': '__', '-': '--' }[c] })}-blue)`
}

// TODO: Create a function that returns the license link
// If there is no license, return an empty string
function renderLicenseLink(license) {
  if (license === "None") { return '' }

  return license.html_url
}

// TODO: Create a function that returns the license section of README
// If there is no license, return an empty string
function renderLicenseSection(license) {
  if (license === "None") { return '' }

  return `This project is licensed under the ${license.name} - see the [License](${renderLicenseLink(license)}) file for details.`
}

// TODO: Create a function to generate markdown for README
function generateMarkdown(data) {
  return `# ${data.title}
${renderLicenseBadge(data.license)}

## Table of Contents

[Description](#description)

[Installation](#installation)

[Usage](#usage)

[Contributing](#contributing)
 
[Tests](#tests)
 
[Questions](#questions)

[License](#license)
 

## Description

${data.description}

## Installation

${data.installation}

## Usage

${data.usage}

## License

${renderLicenseSection(data.license)}

## Contributing

${data.contributing}

## Tests

${data.tests}

## Questions

If you have any questions, you can contact me at the following places:

[Github Account](https://github.com/${data.username})
(${data.email})
`;
}

module.exports = generateMarkdown;
