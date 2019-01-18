# dojot-web library
Helpers classes to integrate with [dojot](http://www.dojot.com.br/)'s services.

This document describes its supported features, along with a basic usage example for each of those.

A sample can be found on the [usageSample.js file](https://github.com/znti/dojot-web/blob/master/usageSample.js) and requires you to clone the repository before executing.

## Installing
First of all, make sure to install the project package through npm.

`npm install --save @znti/dojot-web`

Once installed, simply import it as any other module; 

`let dojot = require('@znti/dojot-web');`

Now all that is left to do is to initialize it with a valid dojot host address.

## Initializing

### init(dojotHost, credentials)
Initializes the client and setups a connection with the dojot server located on `dojotHost`.

Make sure to change your `dojotHost` location, in case yours is not on `localhost:8000`

`credentials` can be passed in case a custom username/password setup must be used. If left empty, the library assumes the default admin/admin setup and tries to authenticate with it.

```js
dojot.init(dojotHost, credentials).then(dojotClient => {
	// From here on, you can use the helpers this library has
	let {Templates, Devices} = dojotClient;
}).catch(console.error);
```

# Using the library

This section describes the helpers available and gives and overview of each supported feature they have.

## Templates

### get()
Lists all templates available at dojot.

```js
Templates.get().then(templates => {
	console.log(`Retrieved ${templates.length} templates`);
}).catch(console.error);
```

### set(templateData)
Creates a new template based on data sent on `templateData`.

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
}).catch(console.error);

Templates.get().then(templates => {
	console.log(`Retrieved ${templates.length} templates`);
}).catch(console.error);
```

## Devices

### get()
Lists all devices available at dojot.

```js
Devices.get().then(devices => {
	console.log(`Retrieved ${devices.length} devices`);
}).catch(console.error);
```

### set(deviceData)
Creates a new device based on data sent on `deviceData`

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
}).catch(console.error);
```

## Resources

* [dojot's official documentation](https://dojotdocs.readthedocs.io/en/stable/index.html)
* [Introduction to dojot platform (in PT-BR) series](https://www.embarcados.com.br/serie/plataforma-dojot/)
