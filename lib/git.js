const process = require('process');
const git = require('git-state');
const gittags = require('git-semver-tags');
const simplegit = require('simple-git');

const pwd = process.cwd();
const repo = simplegit(pwd);

function dirty(cb) {
  git.isGit(pwd, function (exists) {
    if (!exists) {
      return cb(new Error('Needs to be called within a git repository.'));
    }

    git.check(pwd, function (err, result) {
      if (err) {
        return cb(err);
      }

      const dirty = result.ahead > 0 || result.dirty > 0;
      return cb(null, dirty);
    });
  });
}

function version(cb) {
  gittags(function (err, tags) {
    if (err) {
      return cb(err);
    }

    if (tags.length > 0) {
      const latestTag = tags[0];
      return cb(null, latestTag );
    } else {
      return cb(null, null);
    }
  });
}

module.exports = {
  version,
  dirty,
};
