let Templates = require('./helpers/Templates');
let Devices = require('./helpers/Devices');
let Users = require('./helpers/Users');

let configs = require('./configs');

let http = require('./utils/Http');

module.exports = class Dojot {

	constructor() {
		this.Templates = Templates;
		this.Devices = Devices;
		this.Users = Users;
	}

	getAuthToken() {
		return this.authToken;
	}
	
	configure(dojotHost) {
		console.log('Initializing dojot client..');
	
		return http.init(dojotHost).then((dojotClient) => {
			console.log('Configured! Now pointing to', dojotHost);
			this.httpClient = dojotClient;
			return Promise.resolve(this);
		});
	}
	
	initializeWithCredentials(credentials) {
		credentials = credentials || configs.dojot.credentials;
		console.log('Initializing dojot client with credentials', credentials, '..');
		let authEndpoint = configs.dojot.resources.auth;
		return this.httpClient.post(authEndpoint, credentials).then(response => {
			let authToken = response.jwt;
			return this.initializeWithAuthToken(authToken);
		});
	}
	
	initializeWithAuthToken(authToken) {
		console.log('Initializing dojot client with token', authToken);
		this.authToken = authToken;
		return this.httpClient.setAuthToken(authToken).then(() => {
			return this;
		});
	}

}
