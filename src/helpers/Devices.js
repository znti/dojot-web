let stats = require('../utils/Stats');

module.exports = {
	ping() {
		console.log('devices:', stats());
	}
}
