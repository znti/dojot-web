let stats = require('../utils/Stats');

let http = require('../utils/Http');
let configs = require('../config.js');

module.exports = {
	get() {
		let {dojot} = configs;
		let endpoint = `${dojot.host}/${dojot.resources.templates}`;
		//return new http().get('http://www.mocky.io/v2/5c40d0180f00002a24e7b67c').then(response => {
		return new http().get(endpoint).then(response => {
			let message = response.data.message;
			console.log('Retrieved', message);
			return message;
		});
	}
}
