const process = require('process');
const path = require('path');
const semver = require('semver');

const pwd = process.cwd();


function version() {
  const packageFile = require(path.join(pwd, 'package.json'));

  return semver(packageFile.version);
}

module.exports = {
  version,
};
