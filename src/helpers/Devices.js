let http = require('../utils/Http');
const Endpoints = require('../utils/Endpoints');

module.exports = class Device {

	constructor(wsClient) {
		this.ws = wsClient;

		this.endpoint = Endpoints.get('devices');
		console.log('Set Devices endpoint as', this.endpoint);

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
		options = options || {};
		console.log('Setting options', options);
		let baseEndpoint = this.endpoint;
		let queryParams = '';
		let deviceId = options && options.deviceId;

		// Get a single device data
		if(deviceId) {
			baseEndpoint = `${baseEndpoint}/${deviceId}`;
		}
		
		// Pagination
		let { pageSize, pageNumber } = options
		if(pageSize && pageSize > 0 && pageNumber && pageNumber > 0) {
			queryParams = `${queryParams}&page_num=${pageNumber}&page_size=${pageSize}`;
		}

		// Filter by label name
		let { labelContains } = options;
		if(labelContains) {
			queryParams = `${queryParams}&label=${labelContains}`;
		}


		let { filters } = options;
		let attrFilterParams = '';
		if(filters) {
			for(let filterKey in filters) {
				attrFilterParams += `attr=${filterKey}=${filters[filterKey]}`;
			}
		}

		let getEndpoint = `${baseEndpoint}`;
 	
		if(attrFilterParams) {
			queryParams += `${attrFilterParams}`;
		}

		// Trim first '&' and combine with baseUrl
		if(queryParams) {
			queryParams = queryParams.replace('&', '');
			getEndpoint += `?${queryParams}`;
		}

		// TODO once backstage can serve history along with device data, this part will be way simpler
		return new Promise(async (resolve, reject) => {

			let devices = await this._loadDevicesData(getEndpoint);
			console.log('Loaded', devices.length, 'devices');


			let historySize = options && options.historySize;
			if(historySize > 0) {
				console.log('Now loading historic data for each device that has dynamic attributes');
				let ndevices = []

				let promises = await devices.map(async device => {

					let dynamicAttrs = device.attrs.filter(attr => attr.type === 'dynamic');

					if(!dynamicAttrs) {
						console.log(`Skipping device ${device.label} (${device.id}) since it has no dynamic attrs`);
						ndevices.push(device);
						return;
						return device;
					}

					let attrsHistory = await this._loadDeviceHistory(device, historySize);

					dynamicAttrs.map(attr => {
						let { label } = attr;
						attr.history = attrsHistory[label];
					});
					ndevices.push(device);
				});
				
				console.log('Resolving with', devices);

				Promise.all(promises).then(() => {
					resolve(ndevices);
				});

			} else {
				resolve(devices);
			}
		});
		
	}

	_loadDevicesData(getEndpoint) {
		return new Promise((resolve, reject) => {
			http.get(getEndpoint).then(response => {	
				let data = response.devices ? response.devices || [] : [response];
				let devices = data.map(device => {
					let { attrs } = device;
					let acc = [];
					if(attrs) {
						Object.keys(attrs).forEach(k => attrs[k].forEach(v => acc.push(v)));
					}
					attrs = acc;
					device.attrs = attrs;
					return device;
				});
				resolve(devices);
			});
		});
	}

	_loadDeviceHistory(device, historySize) {
		return new Promise((resolve, reject) => {

			console.log(`Requesting history for device ${device.label} (${device.id})`);
			let historyEndpoint = `${Endpoints.history}/device/${device.id}/history`;
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
		return http.post(this.endpoint, deviceData).then(response => {
			let createdDevice = response.devices[0];
			return createdDevice;
		});
	}

	delete(deviceData) {
		let deviceId = deviceData.id;
		let deleteEndpoint = `${this.endpoint}/${deviceId}`;
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
