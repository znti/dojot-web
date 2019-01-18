let http = require('../utils/Http');
let configs = require('../config.js');
let endpoint = configs.dojot.resources.devices

module.exports = {
	get() {
		return http.get(endpoint).then(response => {
			let devices = response.data.devices || [];
			return devices;
		});
	}
}
