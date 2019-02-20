let http = require('../utils/Http');
let configs = require('../configs');
let endpoint = configs.dojot.resources.devices

module.exports = class Device {

	constructor(wsClient) {
		this.ws = wsClient;

		this.deviceChangeCallbacks = [];
		this.deviceDataCallbacks = [];

		this.ws.addEventListener('all', (data) => {
			if(data.metadata.reason === 'statusUpdate') {
				this.deviceChangeCallbacks.map(cb => cb(data));
			} else {
				this.deviceDataCallbacks.map(cb => cb(data));
			}
		});
	}

	get(options) {
		let getEndpoint = endpoint;
		let deviceId = options && options.deviceId;
//		if(options) {
//		let { deviceId } = options;
		if(deviceId) {
			getEndpoint = `${getEndpoint}/${deviceId}`;
		}
//		}

		return http.get(getEndpoint).then(response => {
			
			let data = deviceId ? response : response.devices || [];
			return data;
		});
	}

	set(deviceData) {
		return http.post(endpoint, deviceData).then(response => {
			let createdDevice = response.devices[0];
			return createdDevice;
		});
	}

	delete(deviceData) {
		let deviceId = deviceData.id;
		let deleteEndpoint = `${endpoint}/${deviceId}`;
		return http.delete(deleteEndpoint).then(response => {
			let removedDevice = response.removed_device;
			return removedDevice;
		});
	}

	onDeviceChange(callback) {
		this.deviceChangeCallbacks.push(callback);
	}

	onDeviceData(callback) {
		this.deviceDataCallbacks.push(callback);
	}

}
