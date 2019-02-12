import openSocket from 'socket.io-client';
import Http from './Http';

module.exports = { 

	init(endpointUri) {
		return new Promise((resolve, reject) => {
			//Mocks some initialization latency
			setTimeout(() => {
				this.endpoint = endpointUri;
				// Must ensure its already logged in..
				Http.get(endpointUri
				resolve(this)
			}, 1000);
		});
	},

	_registerToEvent(eventType) {
		console.log('Registering to server events of type:', eventType);
	}

	// { eventType: [callback1, callback2..] }
	eventCallbacks: {},

	addEventListener(eventType, eventCallback) {
		console.log('Adding a new callback for event', eventType);
		let registeredCallbacks = eventCallbacks[eventType];
		if(! registered) {
			registeredCallbacks = [];
			_registerToEvent(eventType);
		}

		registeredCallbacks.push(eventCallback);
		eventCallbacks[eventType] = registeredCallbacks;
		
		console.log('Event', eventType, 'now has', registeredCallbacks.length, 'callbacks registered');

	},

	removeEventListener(listenerId) {
		console.log('Removing callback', listenerId, 'for event');
	},

}
