oclif-example
=============



[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/oclif-example.svg)](https://npmjs.org/package/oclif-example)
[![Downloads/week](https://img.shields.io/npm/dw/oclif-example.svg)](https://npmjs.org/package/oclif-example)
[![License](https://img.shields.io/npm/l/oclif-example.svg)](https://github.com/natzcam/oclif-example/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g oclif-example
$ oclif-example COMMAND
running command...
$ oclif-example (-v|--version|version)
oclif-example/0.0.0 linux-x64 node-v20.20.2
$ oclif-example --help [COMMAND]
USAGE
  $ oclif-example COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`oclif-example conf [KEY] [VALUE]`](#oclif-example-conf-key-value)
* [`oclif-example hello`](#oclif-example-hello)
* [`oclif-example help [COMMAND]`](#oclif-example-help-command)

## `oclif-example conf [KEY] [VALUE]`

manage configuration

```
USAGE
  $ oclif-example conf [KEY] [VALUE] [-h] [-k <value>] [-v <value>] [-d] [-p <value>] [-n <value>] [-c <value>]

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
```

_See code: [conf-cli](https://github.com/natzcam/conf-cli/blob/master/src/commands/conf.ts)_

## `oclif-example hello`

Describe the command here

```
USAGE
  $ oclif-example hello

OPTIONS
  -n, --name=name  name to print

DESCRIPTION
  ...
  Extra documentation goes here
```

_See code: [src/commands/hello.js](https://github.com/natzcam/oclif-example/blob/master/src/commands/hello.js)_

## `oclif-example help [COMMAND]`

display help for oclif-example

```
USAGE
  $ oclif-example help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v2.1.2/src\commands\help.ts)_
<!-- commandsstop -->
