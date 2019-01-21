let http = require('../utils/Http');
let configs = require('../configs');
let endpoint = configs.dojot.resources.devices

module.exports = {
	get() {
		return http.get(endpoint).then(response => {
			let devices = response.devices || [];
			return devices;
		});
	},

	set(deviceData) {
		return http.post(endpoint, deviceData).then(response => {
			let createdDevice = response.devices[0];
			return createdDevice;
		});
	},

	delete(deviceData) {
		let deviceId = deviceData.id;
		let deleteEndpoint = `${endpoint}/${deviceId}`;
		return http.delete(deleteEndpoint).then(response => {
			let removedDevice = response.removed_device;
			return removedDevice;
		});
	}
}
