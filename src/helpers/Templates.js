let http = require('../utils/Http');
const Endpoints = require('../utils/Endpoints');

module.exports = class Templates {

	constructor(wsClient) {
		this.ws = wsClient;

		this.endpoint = Endpoints.get('templates');
		console.log('Set Templates endpoint as', this.endpoint);
	}

	get() {
		return http.get(this.endpoint).then(response => {
			let templates = response.templates || [];
			return templates;
		});
	}

	set(templateData) {
//		let endpoint = configs.dojot.resources.templateCreation;
		return http.post(this.endpoint, templateData).then(response => {
			let createdTemplate = response.template;
			return createdTemplate;
		});
	}

	delete(templateData) {
		let templateId = templateData.id;
		let deleteEndpoint = `${this.endpoint}/${templateId}`;
		return http.delete(deleteEndpoint).then(response => {
			let removedTemplate = response.removed;
			return removedTemplate;
		});
	}
}
