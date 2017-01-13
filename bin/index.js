#!/usr/bin/env node


const git = require('../lib/git');
const npm = require('../lib/npm');

git.dirty();
git.version();

npm.version();


const semver = require('semver');

function nextVersion(version, identifier='patch') {
  return semver.inc(version, identifier);
}

console.log('next', nextVersion('0.1.2', 'major'));
