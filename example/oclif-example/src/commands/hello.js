import {Command, Flags} from '@oclif/core'
import Conf from 'conf'

export default class HelloCommand extends Command {
  static description = `Describe the command here
...
Extra documentation goes here
`

  static flags = {
    name: Flags.string({char: 'n', description: 'name to print'}),
  }

  async run() {
    await this.parse(HelloCommand)
    const config = new Conf({projectName: this.config.name})
    this.log(`hello ${config.get('name')}!`)
  }
}
