let Templates = require('./helpers/Templates');
let Devices = require('./helpers/Devices');
let Users = require('./helpers/Users');

//let configs = require('./configs');

let http = require('./utils/Http');

let Websocket = require('./utils/Websocket');

let Endpoints = require('./utils/Endpoints');

module.exports = class Dojot {

	go() {
		this.configure({host:'http://localhost', customEndpoint: 'api'})
			.then(d => d.initializeWithCredentials())
	}

	getAuthToken() {
		return this.authToken;
	}
	
	configure(dojotConfigs) {
		console.log('Initializing dojot client with configs:', dojotConfigs);
	
		let dojotHost = dojotConfigs.host;
		this.dojotHost = dojotHost;

		Endpoints.configure(dojotConfigs);

		return http.init(dojotHost).then((dojotClient) => {
			console.log('Configured! Now pointing to', dojotHost);
			this.httpClient = dojotClient;
			return Promise.resolve(this);
		});
	}
	
	initializeWithCredentials(user, password) {
		let credentials = {username: 'admin', passwd: 'admin'};
		if(user && password) {
			credentials = {username: user, passwd: password};
		}
		console.log('Initializing dojot client with credentials', credentials, '..');
		console.log('Endpoints:', Endpoints);
		//let authEndpoint = Endpoints.auth;
		let authEndpoint = Endpoints.get('auth');
		return this.httpClient.post(authEndpoint, credentials).then(response => {
			let authToken = response.jwt;
			return this.initializeWithToken(authToken);
		});
	}
	
	initializeWithToken(authToken) {
		console.log('Initializing dojot client with token', authToken);
		this.authToken = authToken;
		return this.httpClient.setAuthToken(authToken).then(() => {
			this.initializeWebsocket().then((wsClient) => {
				console.log('Setting helpers');
				this.Templates = new Templates(wsClient);
				this.Devices = new Devices(wsClient);
				this.Users = new Users(wsClient);
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
		return this.ws.init(this.dojotHost, `${this.dojotHost}/${Endpoints.get('socketioToken')}`);
	}

}
