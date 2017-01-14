#!/usr/bin/env node

const args = require('args');
const process = require('process');

const git = require('../lib/git');
const npm = require('../lib/npm');

git.dirty(function (err, dirty) {
  if (err) {
    throw err;
  }
  console.log('dirty', dirty);
});
git.version(function (err, version) {
  if (err) {
    throw err;
  }
  console.log('git', version);
});

const npmVersion = npm.version();
console.log('npm', npmVersion.raw);


const semver = require('semver');

function getNextVersion(version, identifier='patch') {
  return version.inc(identifier);
}

args
  .option('major', 'Major release')
  .option(['n', 'minor'], 'Minor release (overridden by --major)')

const flags = args.parse(process.argv);

const identifier = flags.major ? 'major' : flags.minor ? 'minor' : 'patch';

const nextVersion = getNextVersion(npmVersion, identifier);
console.log('next', identifier, 'is', nextVersion.raw);
