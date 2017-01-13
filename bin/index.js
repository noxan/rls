#!/usr/bin/env node

const process = require('process');
const path = require('path');
const git = require('git-state');
const gittags = require('git-semver-tags');
const semver = require('semver');

const pwd = process.cwd();

git.isGit(pwd, function (exists) {
  if (!exists) {
    throw new Error('Needs to be called within a git repository.');
  }

  git.check(pwd, function (err, result) {
    if (err) {
      throw err;
    }

    const dirty = result.ahead > 0 || result.dirty > 0;

    console.log('dirty', dirty);
  });
});

gittags(function (err, tags) {
  if (err) {
    throw err;
  }

  if (tags.length < 1) {
    throw new Error('No git releases so far.');
  }

  const latestTag = tags[0];
  console.log('git', latestTag);
});

const packageFile = require(path.join(pwd, 'package.json'));

console.log('npm', semver(packageFile.version).raw);
