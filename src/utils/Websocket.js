const Http = require('./Http');
const openSocket = require('socket.io-client');

module.exports = class Websocket { 

	init(dojotHost, wsTokenHost) {


		return new Promise((resolve, reject) => {
			//Mocks some initialization latency
			setTimeout(() => {
				// Must ensure its already logged in..
				Http.get(wsTokenHost).then(response => {
					let wsToken = response.token;
					console.log('Loaded WS token:', wsToken);
					return wsToken;
				}).then(token => {
					console.log('Opening socket.io connection to', dojotHost);
					this.socketHandler = openSocket(dojotHost, { query: `token=${token}`, transports: ['polling'] });

					console.log('Socket.io handler initialized');	
					this.eventCallbacks = {};

					resolve(this)
				});
			}, 1000);
		});
	}

	_registerToEvent(eventType) {
		console.log('Registering to server events of type:', eventType);
		this.socketHandler.on(eventType, (data) => {
//			console.debug('Event', eventType, 'emmited data:', data);
			let callbacks = this.eventCallbacks[eventType];
			console.debug('Triggering', callbacks.length, 'listeners for event', eventType);
			callbacks.map(cb => cb(data));
		});
	}

	// { eventType: [callback1, callback2..] }
//	let eventCallbacks = {}

	addEventListener(eventType, eventCallback) {
		console.log('Adding a new callback for event', eventType);
		let eventCallbacks = this.eventCallbacks;
		let registeredCallbacks = eventCallbacks[eventType];
		if(! registeredCallbacks) {
			registeredCallbacks = [];
			this._registerToEvent(eventType);
		}

		registeredCallbacks.push(eventCallback);
		eventCallbacks[eventType] = registeredCallbacks;
		
		this.eventCallbacks = eventCallbacks;

		console.log('Event', eventType, 'now has', registeredCallbacks.length, 'callbacks registered');

	}

	removeEventListener(listenerId) {
		console.log('Removing callback', listenerId, 'for event');
	}

}
