let Templates = require('./helpers/Templates');
let Devices = require('./helpers/Devices');

Templates.get().then(console.log);
Devices.get().then(console.log);
