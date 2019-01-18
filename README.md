# dojot-web
Library containing helpers to integrate with [dojot](http://www.dojot.com.br/)'s services.

This document describes its supported features, along with a basic documentation for each of those.

A basic usage example can be found on the [usageSample.js file](https://github.com/znti/dojot-web/blob/master/usageSample.js) and can be run with a simple `node usageSample.js` command once you've cloned the repository and installed its dependencies with `npm install`.

# Initializing the library

### init(dojotHost, credentials)
Initializes the client and setups a connection with the dojot server located on {dojotHost}.

{credentials} can be passed in case a custom username/password setup must be used. If left empty, the library assumes the default admin/admin setup and tries to authenticate with it.

```js
dojot.init(dojotHost, credentials).then(dojotClient => {
	// From here on, you can use the helpers this library has
	let {Templates, Devices} = dojotClient;
});
```

# Using the library

This section describes the helpers available and gives and overview of each supported feature they have.

## Templates

### get()
Lists all templates available at dojot.

```js
Templates.get().then(templates => {
	console.log(`Retrieved ${templates.length} templates`);
});
```

### set(templateData)
Creates a new template based on data sent on {templateData}

```js
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
});

Templates.get().then(templates => {
	console.log(`Retrieved ${templates.length} templates`);
});
```

## Devices

### get()
Lists all devices available at dojot.

```js
Devices.get().then(devices => {
	console.log(`Retrieved ${devices.length} devices`);
});
```

### set(deviceData)
Creates a new device based on data sent on {deviceData}

```js
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
});
```

## Resources

* [dojot's official documentation](https://dojotdocs.readthedocs.io/en/stable/index.html)
* [Introduction to dojot platform (in PT-BR) series](https://www.embarcados.com.br/serie/plataforma-dojot/)
