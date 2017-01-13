#!/usr/bin/env node


const git = require('../lib/git');
const npm = require('../lib/npm');

git.dirty();
git.version();

const npmVersion = npm.version();
console.log('npm', npmVersion.raw);


const semver = require('semver');

function getNextVersion(version, identifier='patch') {
  return version.inc(identifier);
}

const nextVersion = getNextVersion(npmVersion, 'major');
console.log('next', nextVersion.raw);
