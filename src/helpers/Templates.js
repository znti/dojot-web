let http = require('../utils/Http');
let configs = require('../configs');
let endpoint = configs.dojot.resources.templates

module.exports = class Templates {

	constructor(wsClient) {
		this.ws = wsClient;
	}

	get() {
		return http.get(endpoint).then(response => {
			let templates = response.templates || [];
			return templates;
		});
	}

	set(templateData) {
//		let endpoint = configs.dojot.resources.templateCreation;
		return http.post(endpoint, templateData).then(response => {
			let createdTemplate = response.template;
			return createdTemplate;
		});
	}

	delete(templateData) {
		let templateId = templateData.id;
		let deleteEndpoint = `${endpoint}/${templateId}`;
		return http.delete(deleteEndpoint).then(response => {
			let removedTemplate = response.removed;
			return removedTemplate;
		});
	}
}
