let http = require('../utils/Http');
const Endpoints = require('../utils/Endpoints');

module.exports = class Users {

	constructor(wsClient) {
		this.ws = wsClient;

		this.endpoint = Endpoints.get('users');
		console.log('Set Users endpoint as', this.endpoint);
	}

	get() {
		return http.get(this.endpoint).then(response => {
			let users = response.users || [];
			return users;
		});
	}

	set(userData) {
		return http.post(this.endpoint, userData).then(response => {
			let createdUser = response[0].user;
			return createdUser;
		});
	}

	delete(userData) {
		let userId = userData.id;
		let deleteEndpoint = `${this.endpoint}/${userId}`;
		return http.delete(deleteEndpoint).then(response => {
			let removedUser = response.message;
			return removedUser;
		});
	}
}
