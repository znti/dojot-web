let Templates = require('./helpers/Templates');
let Devices = require('./helpers/Devices');

let config = require('./config');

let http = require('./utils/Http');

let init = (dojotHost, credentials) => {
	credentials = credentials || config.dojot.credentials;
	console.log('Initializing dojot client..');

	return http.init(dojotHost).then((dojotClient) => {
		console.log('Got dojot\'s HTTP client. Setting auth token..');
		let authEndpoint = config.dojot.resources.auth;
		return dojotClient.post(authEndpoint, credentials).then(response => {
			let jwt = response.data.jwt;
			return dojotClient.setAuthToken(jwt);
		});
	}).then(dojotClient => {
		console.log('Dojot client is ready!');
		return {Templates, Devices};
	}).catch(e => console.error(e))
}

module.exports = {
	init
}
