let Templates = require('./helpers/Templates');
let Devices = require('./helpers/Devices');
let Users = require('./helpers/Users');

let configs = require('./configs');

let http = require('./utils/Http');

let Websocket = require('./utils/Websocket');

module.exports = class Dojot {

	go() {
		this.configure('http://localhost:8000')
			.then(d => d.initializeWithCredentials())
	}

	getAuthToken() {
		return this.authToken;
	}
	
	configure(dojotHost) {
		console.log('Initializing dojot client..');
	
		this.dojotHost = dojotHost;

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
			return this.initializeWithToken(authToken);
		});
	}
	
	initializeWithToken(authToken) {
		console.log('Initializing dojot client with token', authToken);
		this.authToken = authToken;
		return this.httpClient.setAuthToken(authToken).then(() => {
			this.initializeWebsocket().then(() => {
				this.Templates = new Templates();
				this.Devices = new Devices();
				this.Users = new Users();
			});
		});
	}

	initializeWebsocket() {
		if(!this.authToken) {
			console.log('Not yet logged in. Cannot establish WS connection');
			return;
		}

		this.ws = new Websocket();
		console.log('Initializing ws helper');
		return this.ws.init(this.dojotHost, `${this.dojotHost}/stream/socketio`)
	}

}
