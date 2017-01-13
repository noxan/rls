#!/usr/bin/env node


const git = require('../lib/git');
const npm = require('../lib/npm');

git.dirty();
git.version();

npm.version();
