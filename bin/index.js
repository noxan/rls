#!/usr/bin/env node

const args = require('args');
const process = require('process');

const git = require('../lib/git');
const npm = require('../lib/npm');
const manifest = require('../lib/manifest');



const semver = require('semver');

function getNextVersion(version, identifier='patch') {
  return version.inc(identifier);
}

args
  .option('major', 'Major release')
  .option(['n', 'minor'], 'Minor release (overridden by --major)')
  .option('dry-run', 'Do not perform any change but provide a preview of what would be changed.');

const flags = args.parse(process.argv);

const identifier = flags.major ? 'major' : flags.minor ? 'minor' : 'patch';

git.dirty().then(
  dirty => {
    if (dirty) {
      throw new Error('Git is dirty, please commit your changes before creating a release.');
    }

    const npmVersion = npm.version();

    git.version().then(version => {
      console.log(`Current version: git@${version}, npm@${npmVersion.raw}`);

      if (npmVersion.raw !== version && version !== undefined) {
        throw new Error('Version numbers of latest git tag and npm package missmatch. No idea which one to take.');
      }

      const nextVersion = getNextVersion(npmVersion, identifier);
      console.log('next', identifier, 'is', nextVersion.raw);

      if (!flags.dryRun) {
        manifest.updateVersion(nextVersion);
        git.update(nextVersion);
      }
    });
  }
);
