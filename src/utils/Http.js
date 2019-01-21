const axios = require('axios');

module.exports = {

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
			}, 1000);
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
		console.log('Requesting GET on', endpoint);
		return this.http.get(endpoint)
			.then(response => {
				let {data} = response;
				return Promise.resolve(data);
			})
			.catch(error => {
				let {data} = error.response;
				return Promise.reject(data);
			});
	},

	post(endpoint, data) {
		console.log('Requesting POST on', endpoint, 'with data', data);
		return this.http.post(endpoint, data)
			.then(response => {
				let {data} = response;
				console.log('Got data', data);
				return Promise.resolve(data);
			})
			.catch(error => {
				let {data} = error.response;
				return Promise.reject(data);
			});
	},

	delete(endpoint) {
		console.log('Requesting DELETE on', endpoint);
		return this.http.delete(endpoint)
			.then(response => {
				let {data} = response;
				return Promise.resolve(data);
			})
			.catch(error => {
				let {data} = error.response;
				return Promise.reject(data);
			});
	}
}
