let http = require('../utils/Http');
let configs = require('../config.js');
let endpoint = configs.dojot.resources.devices

module.exports = {
	get() {
		return http.get(endpoint).then(response => {
			let devices = response.data.devices || [];
			return devices;
		});
	},

	set(deviceData) {
		return http.post(endpoint, deviceData).then(response => {
			let createdDevice = response.data.devices[0];
			return createdDevice;
		});
	},

	delete(deviceData) {
		let deviceId = deviceData.id;
		let deleteEndpoint = `${endpoint}/${deviceId}`;
		return http.delete(deleteEndpoint).then(response => {
			let removedDevice = response.data.removed_device;
			return removedDevice;
		});
	}
}
