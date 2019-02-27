const configs = require('../configs');

module.exports = {

	configure: (dojotConfigs) => {
		console.log('Setting endpoints helper with dojotConfigs:', dojotConfigs);

		let endpoints = configs.dojot.resources;
		let customBasePath = dojotConfigs.customEndpoint;

		for(let endpoint in endpoints) {
			let path = customBasePath ? `${customBasePath}/${endpoints[endpoint]}` : `${endpoints[endpoint]}`;
			console.log(`Setting this[${endpoint}] as ${path}`);
			this[endpoint] = path;
		}

		console.log('this', this);

	},

	get: (endpoint) => {
		return this[endpoint];
	},

}
