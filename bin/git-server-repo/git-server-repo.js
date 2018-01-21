#! /usr/bin/env node

const shell = require('shelljs');

const chalk = require('chalk');

const fs = require('fs');

const args = require('yargs')
  .alias('w', 'working-dir')
  .default('w', process.cwd())
    .argv;

const WORKING_DIR = args.w;

const REPO_DIR = `${WORKING_DIR}/.git`;

const HOOKS_DIR = `${REPO_DIR}/hooks`;

const POST_RECEIVE_FILEPATH = `${HOOKS_DIR}/post-receive`;

const log = {
  info: (action, noun) => {
    let message = chalk.cyan(action)
      + (noun ? ` ${chalk.yellow(noun)}` : '')
      + '\n';

    console.log(message);
  },
  danger: (action, noun) => {
    let message = chalk.red(action)
      + (noun ? ` ${chalk.yellow(noun)}` : '')
      + '\n';

    console.log(chalk.red(message))
  }
};

// use cwd as default
if (!fs.existsSync(WORKING_DIR)) {
  shell.mkdir(WORKING_DIR);
  log.info('created git repo dir', WORKING_DIR);
}

if (fs.existsSync(REPO_DIR)) {
  log.danger('Git repo already exists @:', REPO_DIR);
  log.info('Delete the existing git repo if you want to proceed');
  log.danger('Exiting...');
  shell.exit(1);
}

shell.mkdir(REPO_DIR);
log.info('created dir', REPO_DIR);

shell.cd(REPO_DIR);

shell.exec('git init --bare', { silent: true });
log.info('initialized git repo');

shell.cp(`${__dirname}/post-receive.template`, POST_RECEIVE_FILEPATH);
log.info('created post-receive file:', POST_RECEIVE_FILEPATH);

shell.chmod('+x', POST_RECEIVE_FILEPATH);
log.info('adding executable permission to:', POST_RECEIVE_FILEPATH);

log.info('***************************************************');
log.info('SERVER REPO CREATED SUCCESSFULLY');
log.info('\tremote url: ' ,`ssh://<your-username>@<your-server-ip>${REPO_DIR}`);
log.info('***************************************************');
