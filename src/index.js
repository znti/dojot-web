let Templates = require('./helpers/Templates');
let Devices = require('./helpers/Devices');

Templates.get().then(templates => {
	console.log(`Retrieved ${templates.length} templates`);
	templates.map(template => {
		let {label, id, attrs} = template;
		console.log(`Device ${label} (id ${id}) - ${attrs.length} attributes`);
		attrs.map(a => console.log('\t' + a.label));
	});
});

Devices.get().then(devices => {
	console.log(`Retrieved ${devices.length} devices`);

	devices.map(device => {
		let {label, id, attrs} = device;

		//Attrs are mapped as templateId:templateAttrs for each template
		//Here we map them into a flat structure
		let acc = []
		Object.keys(attrs).forEach(k => attrs[k].forEach(v => acc.push(v)))
		attrs = acc;

		console.log(`Device ${label} (id ${id}) - ${attrs.length} attributes`);
		attrs.map(attr => {
			let attrVal = attr.static_value
			console.log(`\t ${attr.label} ${attr.static_value || ''}`)
		});
	});
});

