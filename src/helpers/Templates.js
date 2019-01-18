let http = require('../utils/Http');
let configs = require('../config.js');
let endpoint = configs.dojot.resources.templates

module.exports = {
	get() {
		return http.get(endpoint).then(response => {
			let templates = response.data.templates || [];
			return templates;
		});
	},

	set(templateData) {
//		let endpoint = configs.dojot.resources.templateCreation;
		return http.post(endpoint, templateData).then(response => {
			let createdTemplate = response.data.template;
			return createdTemplate;
		});
	},
}
