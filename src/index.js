let Templates = require('./helpers/Templates');
let Devices = require('./helpers/Devices');

let config = require('./config');

let http = require('./utils/Http');

let authToken;

let init = (dojotHost, credentials) => {
	credentials = credentials || config.dojot.credentials;
	console.log('Initializing dojot client..');

	return http.init(dojotHost).then((dojotClient) => {
		console.log('Got dojot\'s HTTP client. Requesting a new auth token..');
		let authEndpoint = config.dojot.resources.auth;
		return dojotClient.post(authEndpoint, credentials).then(response => {
			console.log('new response', response);
			authToken = response.jwt;
			return dojotClient.setAuthToken(authToken);
		});
	}).then(dojotClient => {
		console.log('Dojot client is ready!');
		let dojotHelpers = {
			Templates,
			Devices,
			getAuthToken: () => authToken,
		};
		return dojotHelpers;
	}).catch(e => console.error(e))
}

module.exports = {
	init
}
