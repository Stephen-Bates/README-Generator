// TODO: Include packages needed for this application
const inquirer = require('inquirer');
const fs = require('fs');
const generateMarkdown = require('./utils/generateMarkdown');
const { log } = require('console');

// TODO: Create an array of questions for user input
const questions = [
    {
        type: 'input',
        name: 'title',
        message: 'Project title:',
    },
    {
        type: 'input',
        name: 'description',
        message: 'Describe your project:'
    },
    {
        type: 'input',
        name: 'installation',
        message: 'How do you install your project:'
    },
    {
        type: 'input',
        name: 'usage',
        message: 'How can people use your project:'
    },
    {
        type: 'list',
        name: 'license',
        message: 'What type of license does your project have:',
        choices: () => new Promise((resolve, reject) => {
            fetch(`https://api.github.com/licenses`)
                .then(response => response.json())
                .then(data => data.map(license => {
                    return {
                        name: license.name,
                        value: new Promise((resolve, reject) => {
                            license.key === 'None' ? resolve('None')
                                : fetch(`https://api.github.com/licenses/${license.key}`)
                                    .then(response => resolve(response.json()))
                        })
                    }
                }))
                .then(list => resolve(['None'].concat(list)))
        })

    },
    {
        type: 'input',
        name: 'contributing',
        message: 'How can people contribute to your project:'
    },
    {
        type: 'input',
        name: 'tests',
        message: 'How can people test your project:'
    },
    {
        type: 'input',
        name: 'username',
        message: 'Github username:'
    },
    {
        type: 'input',
        name: 'email',
        message: 'Contact e-mail:',
        validate: value => new Promise((resolve, reject) => /^.*@.*\..*$/g.test(value.trim()) ? resolve(true) : reject("Please enter a valid e-mail address"))
    }
];

// TODO: Create a function to write README file
function writeToFile(fileName, data) {
    fs.writeFile(fileName, generateMarkdown(data), (err) => {
        if (err) {
            console.log('error wriiting file: ', err);
        } else {
            console.log('creating markdown file');
        }
    });
}


// TODO: Create a function to initialize app
function init() {
    inquirer.prompt(questions)
        .then(response => {
            writeToFile(`${__dirname}\\output\\README.md`, response)
        })
}

// Function call to initialize app
init();
