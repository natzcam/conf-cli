import Conf from 'conf';
const config = new Conf({projectName: 'simple-example'});
console.log(`hello ${config.get('name')}!`);
