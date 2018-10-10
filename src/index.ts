import { Command, flags } from '@oclif/command'
import * as Conf from 'conf';

export default class ConfCommand extends Command {
  static description = 'cli for conf package';

  static flags = {
    help: flags.help({ char: 'h' }),
    key: flags.string({ char: 'k', description: 'key of the config' }),
    value: flags.string({ char: 'v', description: 'value of the config' }),
    delete: flags.boolean({ char: 'd', description: 'delete?' }),
    encrypt: flags.string({ char: 'e', description: 'encryption key' }),
    project: flags.string({ char: 'p', description: 'project name' }),
    name: flags.string({ char: 'n', description: 'config file name' }),
    cwd: flags.string({ char: 'd', description: 'config file location' }),
  }

  static args = [
    { name: 'key', description: 'key of the config' },
    { name: 'value', description: 'value of the config' }
  ]

  async run() {
    const { args, flags } = this.parse(ConfCommand);

    const opts = {
      ...(flags.name && { configName: flags.name }),
      ...(flags.project && { projectName: flags.name }),
      ...(flags.cwd && { cwd: flags.cwd }),
    };

    const config: typeof Conf = new Conf(opts);

    if (args.key) {
      if (flags.delete) {
        config.delete(args.key);
      } else if (args.value) {
        config.set(args.key, args.value);
      } else {
        this.log(config.get(args.key));
      }
    } else if (flags.key) {
      if (flags.delete) {
        config.delete(flags.key);
      } else if (flags.value) {
        config.set(flags.key, flags.value);
      } else {
        this.log(config.get(flags.key));
      }
    }
  }
}
