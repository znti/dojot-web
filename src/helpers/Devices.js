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
		console.log('Setting options', options);
		let getEndpoint = endpoint;
		let deviceId = options && options.deviceId;
		if(deviceId) {
			getEndpoint = `${getEndpoint}/${deviceId}`;
		} else {
			let { pageSize, pageNumber } = options
			if(pageSize && pageSize > 0 && pageNumber && pageNumber > 0) {
				getEndpoint = `${getEndpoint}?page_num=${pageNumber}&page_size=${pageSize}`;
			}
		}

		let historySize = options && options.historySize;
 	
		return new Promise((resolve, reject) => {

		http.get(getEndpoint).then(response => {	
			let data = deviceId ? [response] : response.devices || [];

			data.map(device => {
				let { attrs } = device;
				let acc = [];
				if(attrs) {
					Object.keys(attrs).forEach(k => attrs[k].forEach(v => acc.push(v)));
				}
				attrs = acc;
				device.attrs = attrs;
				return device;
			});

			if(historySize > 0) {
				let promises = [];
				let devices = []

				data.map(device => {

					let dynamicAttrs = device.attrs.filter(attr => attr.type === 'dynamic');
					if(dynamicAttrs) {
						let p = this.getDeviceHistory(device, historySize).then(attrsHistory => {
							dynamicAttrs.map(attr => {
								let { label } = attr;
								console.log('Setting attr:', attr, 'history on', device);
								attr.history = attrsHistory[label];
							});
							console.log('Adding device', device);
							devices.push(device);
						});
					
						promises.push(p);
					} else {
						console.log(`Skipping device ${device.label} (${device.id}) since it has no dynamic attrs`);
						devices.push(device);
					}
				});

				console.log('P is:', promises);

				console.log('Waiting...');
				Promise.all(promises).then(() => {
					console.log('Done!');
					resolve(devices);
				});

			} else {
				resolve(data);
			}
		});
		
		});

	}

	getDeviceHistory(device, historySize) {
		return new Promise((resolve, reject) => {

			console.log(`Requesting history for device ${device.label} (${device.id})`);
			let historyEndpoint = `${configs.dojot.resources.history}/device/${device.id}/history`;
			historyEndpoint = `${historyEndpoint}?lastN=${historySize}`;

			http.get(historyEndpoint).then(attrsHistory => {
				console.log('Returning history data:', attrsHistory);
				resolve(attrsHistory);
			}).catch(err => {
				console.log(`Failed on device ${device.id}. Skipping for now.`);
				let attrsHistory = {};
				device.attrs.map(d => {
					attrsHistory[d.label] = [];
				});
				console.log('Returning history data:', attrsHistory);
				resolve(attrsHistory);
			});
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
