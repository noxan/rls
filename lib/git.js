const process = require('process');
const git = require('git-state');
const gittags = require('git-semver-tags');
const simplegit = require('simple-git');

const pwd = process.cwd();
const repo = simplegit(pwd);

function dirty() {
  return new Promise((resolve, reject) => {
    git.isGit(pwd, function (exists) {
      if (!exists) {
        return reject(new Error('Needs to be called within a git repository.'));
      }
      git.check(pwd, function (err, result) {
        if (err) {
          return reject(err);
        }

        const dirty = result.ahead > 0 || result.dirty > 0;
        resolve(dirty);
      });
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

function update(version) {
  const message = `Release ${version.raw}`;
  repo
    .add('./package.json')
    .commit(message)
    .addAnnotatedTag(version.raw, message);
}

module.exports = {
  version,
  dirty,
  update,
};
