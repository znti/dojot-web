let dojot = require('./src/index');

// Sets the base point for dojot.
let dojotHost = 'http://localhost:8000';

// This parameter on init() is actually optional. 
// If nothing is passed, admin/admin is assumed
// The only reason its here is to guide users in need of using custom credentials
let credentials = {username: 'admin', passwd: 'admin'}

dojot.init(dojotHost, credentials).then(dojotClient => {

	let {Templates, Devices} = dojotClient;

	Templates.get().then(templates => {
		console.log(`Retrieved ${templates.length} templates`);
		templates.map(printTemplate);
	}).catch(console.error);
	
	Devices.get().then(devices => {
		console.log(`Retrieved ${devices.length} devices`);
		devices.map(printDevice);
	}).catch(console.error);

	Templates.set({
		"label": "EquipmentName",
		"attrs": [
		  {
		    "label": "serialCode",
		    "type": "dynamic",
		    "value_type": "string"
		  }
		]
	}).then(template => {
		console.log('Created a new template');
		printTemplate(template);
	}).catch(console.error);


	Devices.set({
		"label": "equipamentoDoJoao",
		"templates": [
			"12"
		],
		"attrs": [
			{
				"id": 76,
				"label": "serialCode",
				"static_value": "SC01",
				"template_id": "12",
				"type": "dynamic",
				"value_type": "string"
			}
		]
	}).then(device => {
		console.log('Created a new device');
		printDevice(device);
	}).catch(console.error);

}).catch(console.error);

let printTemplate = (template) => {
	let {label, id, attrs} = template;
	console.log(`Template ${label} (id ${id}) - ${attrs.length} attributes`);
	attrs.map(a => console.log('\t' + a.label));
}

let printDevice = (device) => {
	let {label, id, attrs} = device;

	//Attrs are mapped as templateId:templateAttrs for each template
	//Here we map them into a flat structure
	let acc = []
	if(attrs) {
		Object.keys(attrs).forEach(k => attrs[k].forEach(v => acc.push(v)))
	}
	attrs = acc;

	console.log(`Device ${label} (id ${id}) - ${attrs.length} attributes`);
	attrs.map(attr => console.log(`\t ${attr.label} ${attr.static_value || ''}`) );
}

