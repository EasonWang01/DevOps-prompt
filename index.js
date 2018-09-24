#!/usr/bin/env node

'use strict';
const inquirer = require('inquirer');
const fuzzy = require('fuzzy');
const { exec } = require('child_process');
var { commands } = require('./commands');
require('json5/lib/register');

if(process.argv.length > 2 && process.argv[2]) {
  const extraConfig = require(process.argv[2]);
  commands = [...extraConfig, ...commands];
}

inquirer.registerPrompt('autocomplete', require('inquirer-autocomplete-prompt'));

const commandName = commands.map(command => command.name)
const commandIntru = commands.map(command => command.command)

function searchCMD(answers, input) {
  input = input || '';
  return new Promise(function (resolve) {
    var fuzzyResult = fuzzy.filter(input, commandName);
    resolve(
      fuzzyResult.map(function (el) {
        return el.original;
      })
    );
  });
}

inquirer
  .prompt([
    {
      type: 'autocomplete',
      name: 'command',
      message: 'What do you want to do?',
      source: searchCMD,
      pageSize: 10,
    },
  ])
  .then(function (answers) {
    const commandIdx = commandName.findIndex((ele) => ele === answers.command);
    const cmdInfo = exec(commandIntru[commandIdx]);
    console.info('\x1b[33m%s\x1b[0m', `Command executed: ${commandIntru[commandIdx]} \r\n`)
    cmdInfo.stdout.on('data', (data) => {
      console.log(`stdout: ${data}`);
    });
    cmdInfo.stderr.on('data', (data) => {
      console.log(`stderr: ${data}`);
    });
    cmdInfo.on('close', (code) => {
      console.log(`child process exited with code ${code}`);
    });
  });