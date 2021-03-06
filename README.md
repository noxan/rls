# rls - minimalistic release

[![Build Status](https://travis-ci.org/noxan/rls.svg?branch=master)](https://travis-ci.org/noxan/rls)

It's never been easier to release a new version of your package.

## What's it good for?

Helps you to release new versions of your package.

- Updates your `package.json`
- Creates a new git tag

And helps you counting in semantic versions.

## Installation

    $ npm install -g rls

## Usage

Release a new patch version, e.g. `1.2.3` -> `1.2.4`

    $ rls

Release new feature version, e.g. `1.2.3` -> `1.3.0`

    $ rls --minor

Release new major version, e.g. `1.2.3` -> `2.0.0`

    $ rls --major

Uncertain what will happen? Use the `--dry-run` flag to get a preview of the changes without anything being changed:

    $ rls <other flags...> --dry-run

## Inspiration

* ember has a nice release command, https://github.com/lytics/ember-cli-release
* zeit/release is the same, with just a lot of changelog management on top, https://github.com/zeit/release
* https://github.com/sindresorhus/np
