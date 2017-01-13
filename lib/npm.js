const process = require('process');
const path = require('path');
const semver = require('semver');

const pwd = process.cwd();


function version() {
  const packageFile = require(path.join(pwd, 'package.json'));

  console.log('npm', semver(packageFile.version).raw);
}

module.exports = {
  version,
};
