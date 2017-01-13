const process = require('process');
const git = require('git-state');
const gittags = require('git-semver-tags');

const pwd = process.cwd();

function dirty() {
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
}

function version() {
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
}

module.exports = {
  version,
  dirty,
};
