let Templates = require('./helpers/Templates');
let Devices = require('./helpers/Devices');

Templates.ping().then(console.log);
Devices.ping().then(console.log);
