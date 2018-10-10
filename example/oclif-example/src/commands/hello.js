const {Command, flags} = require('@oclif/command')
const Conf = require('conf');
const config = new Conf();

class HelloCommand extends Command {
  async run() {
    const {flags} = this.parse(HelloCommand)
    this.log(`hello ${config.get('name')}!`);
  }
}

HelloCommand.description = `Describe the command here
...
Extra documentation goes here
`

HelloCommand.flags = {
  name: flags.string({char: 'n', description: 'name to print'}),
}

module.exports = HelloCommand
