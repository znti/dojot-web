let http = require('../utils/Http');
let configs = require('../configs');
let endpoint = configs.dojot.resources.users

module.exports = class Users {

	constructor(wsClient) {
		this.ws = wsClient;
	}

	get() {
		return http.get(endpoint).then(response => {
			let users = response.users || [];
			return users;
		});
	}

	set(userData) {
		return http.post(endpoint, userData).then(response => {
			let createdUser = response[0].user;
			return createdUser;
		});
	}

	delete(userData) {
		let userId = userData.id;
		let deleteEndpoint = `${endpoint}/${userId}`;
		return http.delete(deleteEndpoint).then(response => {
			let removedUser = response.message;
			return removedUser;
		});
	}
}
