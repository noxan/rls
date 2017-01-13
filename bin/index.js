#!/usr/bin/env node

const process = require('process');
const path = require('path');
const semver = require('semver');

const pwd = process.cwd();

const git = require('../lib/git');

git.dirty();
git.version();

const packageFile = require(path.join(pwd, 'package.json'));

console.log('npm', semver(packageFile.version).raw);
