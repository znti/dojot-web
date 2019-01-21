# dojot-web library
Helper classes to integrate with [dojot](http://www.dojot.com.br/)'s services.

This document describes its supported features, along with a basic usage example for each of those.

A sample of its usage can be found on the [CLI tool](https://github.com/znti/dojot-cli ) - which uses this module underneath.

## Installing
First of all, make sure to install the project package through npm.

`npm install --save @znti/dojot-web`

Once installed, simply import it as any other module; 

`const dojotLibrary = require('@znti/dojot-web');`

Now all that is left to do is to initialize it with a valid dojot host address.

## Initializing

This module is exported as a class. To use it, instantiate it from the required object.

```js
const dojot = new dojotLibrary();
```

### configure(dojotHost)
Initializes the client and setups a connection with the dojot server located on `dojotHost`.
```js
let dojotHost = 'http://localhost:8000';
dojot.configure(dojotHost).then(configuredClient => {
	// The client is now pointing to the specified dojot host.
	// All thats left is to provide some credentials.
}).catch(console.error);
```

Make sure to change your `dojotHost` location, in case yours is not on `localhost:8000`

### initializeWithCredentials(credentials)
Initializes the client based on its credentials.
`credentials` is an object formatted as `{username: <user>, passwd: <pwd>}`. It can be passed if custom username/password setup must be used. If left empty, the library assumes the default credentials located at [configs.js](https://github.com/znti/dojot-web/blob/master/src/configs.js) and tries to authenticate with it.

```js
let credentials = {username:'admin', passwd:'admin'};
configuredClient.initializeWithCredentials(credentials).then(initializedClient => {
	// From here on, you can use the helpers this library has
	let {Templates, Devices} = initializedClient;
}).catch(console.error);
```

### initializeWithAuthToken(authToken)
Initializes the client with a JWT previously generated by the dojot server.
If you have a cached JWT, this is the best way to reuse it.

```js
let authToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJZcVhJSmhOZ0psZFpOUTRYN3BFQkFCanMwNTJiM0lSTiIsImlhdCI6MTU0ODA4MzI3OSwiZXhwIjoxNTQ4MDgzNjk5LCJuYW1lIjoiQWRtaW4gKHN1cGVydXNlcikiLCJlbWFpbCI6ImFkbWluQG5vZW1haWwuY29tIiwicHJvZmlsZSI6ImFkbWluIiwiZ3JvdXBzIjpbMV0sInVzZXJpZCI6MSwianRpIjoiYjg5ZTQ5YWQ4MmUxOTY1YTNkZDE4OGE5NWQ5ZDQ1YjMiLCJzZXJ2aWNlIjoiYWRtaW4iLCJ1c2VybmFtZSI6ImFkbWluIn0.SnXBMGQWF99nCvmn8tH_mloreHA4NYT-S8hkjSo7-0g';

configuredClient.initializeWithAuthToken(authToken).then(initializedClient => {
	// From here on, you can use the helpers this library has
	let {Templates, Devices} = initializedClient;
}).catch(console.error);
```

# Using the library

This section describes the helpers available and gives an overview of each supported feature they have.

### getAuthToken()
Returns the curent jwt used for authentication.

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
```

### delete(templateData)
Deletes the template identified on `templateData`.

```js
Templates.delete({
        "label": "EquipmentName",
        "attrs": [
                {
                        "label": "serialCode",
                        "type": "dynamic",
                        "value_type": "string"
                }
        ]
}).then(template => {
        console.log('Removed template', template);
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

### delete(deviceData)
Deletes the device identified on `deviceData`.

```js
Devices.delete({
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
        console.log('Removed device', device);
}).catch(console.error);
```

## Resources

* [dojot website](http://dojot.com.br/)
* [dojot's official documentation](https://dojotdocs.readthedocs.io/en/stable/index.html)
