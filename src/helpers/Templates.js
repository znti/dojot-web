let http = require('../utils/Http');
let configs = require('../config.js');
let endpoint = configs.dojot.resources.templates

module.exports = {
	get() {
		return http.get(endpoint).then(response => {
			let templates = response.data.templates || [];
			return templates;
		});
	}
}
