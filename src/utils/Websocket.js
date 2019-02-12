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

	registerToEvent(eventType) {
		
	}

	// { eventType: { callbacks: [] } }
	eventCallbacks: {},

	addEventListener(eventType, eventCallback) {
		console.log('Adding a new callback for event', eventType);
	},

	removeEventListener(listenerId) {
		console.log('Removing callback', listenerId, 'for event');
	},

}
