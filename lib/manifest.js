const process = require('process');
const path = require('path');
const fs = require('fs');
const semver = require('semver');

const pwd = process.cwd();

function updateVersion(version) {
  const filePath = path.join(pwd, 'package.json')
  const packageData = fs.readFileSync(filePath, 'utf-8');
  const package = JSON.parse(packageData);

  package.version = version.raw;

  const nextData = JSON.stringify(package, null, 2) + '\n';
  fs.writeFileSync(filePath, nextData, 'utf-8');
}

module.exports = {
  updateVersion,
};
