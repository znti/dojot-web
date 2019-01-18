let Templates = require('./helpers/Templates');
let Devices = require('./helpers/Devices');

let config = require('./config');
let dojotHost = config.dojot.host;

let http = require('./utils/Http');

let init = () => {
	console.log('Initializing dojot client');
	return http.init(dojotHost).then((dojot) => {
		console.log('Dojot client started.');
		return {Templates, Devices};
	});
}

module.exports = {
	init
}
