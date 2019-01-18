const axios = require('axios');

//module.exports = class Http {
module.exports = {

	ping() {
		console.log('Ping from HttpHelper');
	},

	init(endpointUri) {
		return new Promise((resolve, reject) => {
			//Mocks some initialization latency
			setTimeout(() => {
				
				this.endpoint = endpointUri;
				console.log('Initializing http helper pointing to', this.endpoint);
				this.http = axios.create({
					baseURL: this.endpoint,
				});
				resolve(this)
			}, 2000);
		});
	},

	setAuthToken(jwt, defaultTimeout) {
		let timeout = defaultTimeout || 5000;
		return new Promise((resolve, reject) => {
		console.log('Setting auth token as', jwt);
			this.http = axios.create({
				baseURL: this.endpoint,
				timeout: timeout,
				headers: {
					'Authorization': `Bearer ${jwt}`,
					'Content-Type': 'application/json',
				}
			});

			resolve();
		});
	},

	get(endpoint) {
		console.log('Requesting GET', endpoint);
		return this.http.get(endpoint);
	},

	post(endpoint, data) {
		console.log('Requesting POST', endpoint, 'with data', data);
		return this.http.post(endpoint, data);
	},
}
