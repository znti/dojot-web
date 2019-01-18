let stats = require('../utils/Stats');

let http = require('../utils/Http');
let configs = require('../config.js');

module.exports = {
	get() {
		let {dojot} = configs;
		let endpoint = `${dojot.host}/${dojot.resources.templates}`;
		return new http().get(endpoint).then(response => {
			let templates = response.data.templates || [];
			return templates;
		});
	}
}
