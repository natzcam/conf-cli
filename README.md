conf-cli
========

> * simple cli interface for [sindresorhus/conf](https://github.com/sindresorhus/conf)
> * [oclif plugin](https://oclif.io/docs/plugins) that adds a `conf` command that lets you manage state/configuration between commands
> * standalone key/value store

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/conf-cli.svg)](https://npmjs.org/package/conf-cli)
[![Downloads/week](https://img.shields.io/npm/dw/conf-cli.svg)](https://npmjs.org/package/conf-cli)
[![License](https://img.shields.io/npm/l/conf-cli.svg)](https://github.com/natzcam/conf-cli/blob/master/package.json)

# Install
```
npm install -g conf-cli
```

Requires Node.js 20 or later.

## `conf [KEY] [VALUE]`

manage configuration

```
USAGE
  $ conf [KEY] [VALUE] [-h] [-k <value>] [-v <value>] [-d] [-p <value>] [-n <value>] [-c <value>] [--version]

ARGUMENTS
  [KEY]    key of the config
  [VALUE]  value of the config

FLAGS
  -c, --cwd=<value>      config file location
  -d, --delete           delete?
  -h, --help             Show CLI help.
  -k, --key=<value>      key of the config
  -n, --name=<value>     config file name
  -p, --project=<value>  project name
  -v, --value=<value>    value of the config
      --version          show conf-cli version
```

> * if [VALUE] is not provided, value of the key is printed (exits with code 1 if the key is not set)
> * if [KEY] and [VALUE] is not provided, all the keys will be printed
> * keys containing `__proto__`, `constructor` or `prototype` are rejected
> * `--project` and `--name` can't contain path separators or `..` (except a scoped package name like `@scope/app` for `--project`); use `--cwd` to pick a location

**Security note:** values are stored as plaintext JSON (under `~/.config/<project>-nodejs/` on Linux by default). Don't store secrets such as passwords or API tokens with conf-cli.


_See code: [src/commands/conf.ts](https://github.com/natzcam/conf-cli/blob/master/src/commands/conf.ts)_

# Usage

## as [sindresorhus/conf](https://github.com/sindresorhus/conf) cli interface

use sindresorhus/conf in your app
```javascript
// simple-example/index.js
import Conf from 'conf';
const config = new Conf({projectName: 'simple-example'});
console.log(`hello ${config.get('name')}!`);
```
use conf-cli to update `name` property from outside the app.
--project/-p flag sets the target project (package name).
```sh-session
$ conf name world -p simple-example
```
see it affect simple-example
```sh-session
$ node simple-example/index.js
hello world!
```

## as an [oclif plugin](https://oclif.io/docs/plugins)
create a new oclif project (requires `@oclif/core` v4 or later)
```sh-session
$ npx oclif generate oclif-example
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
  oclif-example/0.0.0 linux-x64 node-v20.20.2

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
```javascript
// src/commands/hello.js
import {Command} from '@oclif/core'
import Conf from 'conf'

export default class HelloCommand extends Command {
  async run() {
    const config = new Conf({projectName: this.config.name})
    this.log(`hello ${config.get('name')}!`)
  }
}
```
## as a standalone key/value store

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

# Examples

[here](https://github.com/natzcam/conf-cli/tree/master/example)
