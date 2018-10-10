conf-cli
========

> simple cli for [conf](https://github.com/sindresorhus/conf)


[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/conf-cli.svg)](https://npmjs.org/package/conf-cli)
[![Downloads/week](https://img.shields.io/npm/dw/conf-cli.svg)](https://npmjs.org/package/conf-cli)
[![License](https://img.shields.io/npm/l/conf-cli.svg)](https://github.com/natzcam/conf-cli/blob/master/package.json)

# Install
```
npm install -g conf-cli
```

## `conf [KEY] [VALUE]`

manage configuration

```
USAGE
  $ conf [KEY] [VALUE]

ARGUMENTS
  KEY    key of the config
  VALUE  value of the config

OPTIONS
  -d, --cwd=cwd          config file location
  -d, --delete           delete?
  -h, --help             show CLI help
  -k, --key=key          key of the config
  -n, --name=name        config file name
  -p, --project=project  project name
  -v, --value=value      value of the config
```

_See code: [src\commands\conf.ts](https://github.com/natzcam/conf-cli/blob/v0.1.1/src\commands\conf.ts)_

# Usage

### as a standalone key/value store

```sh-session
$ conf hello jonsnow
$ conf hi varys
$ conf hello
jonsnow
$ conf hi
varys
$ conf
hello
hi
```

### as [conf](https://github.com/sindresorhus/conf) manager
```javascript
// simple-example/index.js
const Conf = require('conf');
const config = new Conf();
console.log(`hello ${config.get('name')}!`);
```
use conf-cli to update 'name' from outside
```sh-session
$ conf name world -p simple-example
```
see it affect the target project:
```sh-session
$ node simple-example/index.js
hello world!
```

### as an [oclif plugin](https://oclif.io/docs/plugins)
create a new oclif project
```sh-session
$ oclif multi oclif-example
```
install conf-cli
```sh-session
$ npm install --save conf-cli
```
add to oclif plugins in package.json
```javascript
 "oclif": {
    "plugins": [
      "conf-cli"
    ]
  },
```
```sh-session
$ oclif-example
VERSION
  oclif-example/0.0.0 win32-x64 node-v8.9.1

USAGE
  $ oclif-example [COMMAND]

COMMANDS
  conf   manage configuration <=========== yahoo! ;)
  hello  Describe the command here
  help   display help for oclif-example
```

When used as a plugin, -p will default to the parent cli package name.

```sh-session
$ oclif-example conf name daenarys
$ oclif-example hello
hello daenarys!
$ conf -p oclif-example name
daenarys
```

# Examples

[here](https://github.com/natzcam/conf-cli/tree/master/example)
