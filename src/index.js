let Templates = require('./helpers/Templates');
let Devices = require('./helpers/Devices');

let config = require('./config');
let dojotHost = config.dojot.host;

let http = require('./utils/Http');

let init = (credentials) => {
	credentials = credentials || {username:'admin', passwd:'admin'};
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
		console.log(dojotClient.jwt);
		return {Templates, Devices};
	}).catch(e => console.error(e))
}

module.exports = {
	init
}
