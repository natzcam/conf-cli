import {Command, CommandHelp, Help} from '@oclif/core'

// When conf-cli runs standalone, its binary is already named `conf`, so drop
// the command id from usage lines (`$ conf [KEY]` instead of `$ conf conf [KEY]`).
// oclif only reads helpClass from the root CLI, so plugin hosts are unaffected.
class StandaloneCommandHelp extends CommandHelp {
  protected usage(): string {
    return super.usage().replace(' <%= command.id %>', '')
  }
}

export default class StandaloneHelp extends Help {
  protected getCommandHelpClass(command: Command.Loadable): CommandHelp {
    return new StandaloneCommandHelp(command, this.config, this.opts)
  }
}
