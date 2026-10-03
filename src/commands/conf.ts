import {Args, Command, Flags} from '@oclif/core'
import Conf from 'conf'
import {createRequire} from 'node:module'

const pjson = createRequire(import.meta.url)('../../package.json') as {name: string; version: string}

// conf (via dot-prop) silently drops keys that touch these segments to block
// prototype pollution; reject them up front so the user knows nothing was stored.
const UNSAFE_KEY_SEGMENTS = new Set(['__proto__', 'constructor', 'prototype'])

// --project and --name become part of the config file path, so they must not
// contain separators or ".." that would let them escape the config directory.
const isPathSegment = (value: string) => !value.includes('..') && !/[/\\]/.test(value)
const isScopedPackageName = (value: string) => /^@[^/\\]+\/[^/\\]+$/.test(value) && !value.includes('..')

export default class ConfCommand extends Command {
  static id = 'conf'
  static description = 'manage configuration'

  static flags = {
    help: Flags.help({char: 'h'}),
    key: Flags.string({char: 'k', description: 'key of the config'}),
    value: Flags.string({char: 'v', description: 'value of the config'}),
    delete: Flags.boolean({char: 'd', description: 'delete?'}),
    project: Flags.string({char: 'p', description: 'project name'}),
    name: Flags.string({char: 'n', description: 'config file name'}),
    cwd: Flags.string({char: 'c', description: 'config file location'}),
    version: Flags.boolean({description: 'show conf-cli version'}),
  }

  static args = {
    key: Args.string({description: 'key of the config'}),
    value: Args.string({description: 'value of the config'}),
  }

  async run() {
    const {args, flags} = await this.parse(ConfCommand)

    // Report conf-cli's own version, also when loaded as a plugin into another CLI
    if (flags.version) {
      this.log(`${pjson.name}/${pjson.version}`)
      return
    }

    if (flags.project && !isPathSegment(flags.project) && !isScopedPackageName(flags.project)) {
      this.error(`invalid --project "${flags.project}": use a package name, or --cwd to choose the location`, {exit: 2})
    }

    if (flags.name && !isPathSegment(flags.name)) {
      this.error(`invalid --name "${flags.name}": use a file name, or --cwd to choose the location`, {exit: 2})
    }

    const config = new Conf({
      projectName: flags.project ?? this.config.name,
      ...(flags.name && {configName: flags.name}),
      ...(flags.cwd && {cwd: flags.cwd}),
    })

    const key = args.key ?? flags.key
    const value = args.value ?? flags.value

    if (key && key.split('.').some(segment => UNSAFE_KEY_SEGMENTS.has(segment))) {
      this.error(`invalid key "${key}": "__proto__", "constructor" and "prototype" are not allowed`, {exit: 2})
    }

    if (key) {
      if (flags.delete) {
        config.delete(key)
      } else if (value) {
        config.set(key, value)
      } else {
        const current = config.get(key)
        if (current === null || current === undefined) {
          this.exit(1)
        }
        this.log(typeof current === 'object' ? JSON.stringify(current) : String(current))
      }
    } else {
      for (const [k] of config) {
        this.log(k)
      }
    }
  }
}
