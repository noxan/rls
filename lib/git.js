const process = require('process');
const git = require('git-state');
const gittags = require('git-semver-tags');
const simplegit = require('simple-git');

const pwd = process.cwd();
const repo = simplegit(pwd);

const dirty = () =>
  new Promise((resolve, reject) => {
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

const version = () =>
  new Promise((resolve, reject) => {
    gittags(function (err, tags) {
      if (err) {
        return reject(err);
      }

      if (tags.length > 0) {
        return resolve(tags[0]);
      }
      return resolve(undefined);
    });
  })

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
