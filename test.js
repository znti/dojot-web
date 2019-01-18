let dojot = require('./src/index');

// Sets the base point for dojot.
let dojotHost = 'http://www.mocky.io';

// This parameter on init() is actually optional. 
// If nothing is passed, admin/admin is assumed
// The only reason its here is to guide users in need of using custom credentials
let credentials = {username: 'admin', passwd: 'admin'}


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
	Object.keys(attrs).forEach(k => attrs[k].forEach(v => acc.push(v)))
	attrs = acc;

	console.log(`Device ${label} (id ${id}) - ${attrs.length} attributes`);
	attrs.map(attr => console.log(`\t ${attr.label} ${attr.static_value || ''}`) );
}

dojot.init(dojotHost, credentials).then(dojotClient => {

	let {Templates, Devices} = dojotClient;

	Templates.get().then(templates => {
		console.log(`Retrieved ${templates.length} templates`);
		templates.map(printTemplate);
	});
	
	Devices.get().then(devices => {
		console.log(`Retrieved ${devices.length} devices`);
		devices.map(printDevice);
	});

	Templates.set({
		"label": "EquipmentName",
		"attrs": [
		  {
		    "label": "modelCode",
		    "type": "static",
		    "static_value": "SFM2000",
		    "value_type": "string"
		  }
		]
	}).then(template => {
		console.log('Created a new template');
		printTemplate(template);
	});
});
