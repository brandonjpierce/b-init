#!/usr/bin/env node
const path = require('path');
const execa = require('execa');
const cpy = require('cpy');
const Listr = require('listr');

const blueprints = path.join(__dirname, 'blueprints');

const files = [
  path.join(blueprints, '.editorconfig'),
  path.join(blueprints, '.gitattributes'),
  path.join(blueprints, '.gitignore'),
  path.join(blueprints, '.eslintrc'),
  path.join(blueprints, 'license'),
  path.join(blueprints, 'package.json'),
  path.join(blueprints, 'index.js'),
  path.join(blueprints, 'test.js'),
];

const npmArgs = [
  'install',
  'ava',
  'eslint',
  'eslint-plugin-import',
  'eslint-plugin-react',
  'eslint-plugin-jsx-a11y@^2.2.3', // hack for airbnb config error
  'eslint-config-airbnb',
  '--save-dev',
];

const tasks = new Listr([{
  title: 'Adding boilerplate files',
  task: () => cpy(files, process.cwd(), { overwrite: false }),
}, {
  title: 'Installing dependencies',
  task: () => execa('npm', npmArgs),
}, {
  title: 'Creating yarn lockfile',
  task: () => execa('yarn'),
}]);

tasks.run().catch(err => console.log(err));
