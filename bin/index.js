#!/usr/bin/env node

const process = require('process');
const path = require('path');
const semver = require('semver');

const pwd = process.cwd();

const packageFile = require(path.join(pwd, 'package.json'));

console.log(semver(packageFile.version));
