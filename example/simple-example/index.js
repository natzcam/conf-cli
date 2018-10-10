const Conf = require('conf');
const config = new Conf();
console.log(`hello ${config.get('name')}!`);
