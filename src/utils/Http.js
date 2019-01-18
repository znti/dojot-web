const axios = require('axios');
const config = require('../config');

//module.exports = class Http {
module.exports = {

	ping() {
		console.log('Ping from HttpHelper');
	},

	init(endpointUri, networkTimeout) {
		this.timeout = networkTimeout || 5000;
		return new Promise((resolve, reject) => {
			//Mocks some initialization latency
			setTimeout(() => {
				this.endpoint = endpointUri;
				this.http = axios.create({
					baseURL: this.endpoint,
					timeout: this.timeout,
				});
				resolve(this)
			}, 2000);
		});
	},

	setAuthToken(jwt) {
		return new Promise((resolve, reject) => {
			console.log('Setting auth token as', jwt);
			this.jwt = jwt;
			this.http = axios.create({
				baseURL: this.endpoint,
				timeout: this.timeout,
				headers: {
					'Authorization': `Bearer ${this.jwt}`,
					'Content-Type': 'application/json',
				}
			});
			resolve(this);
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
