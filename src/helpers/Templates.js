let stats = require('../utils/Stats');

module.exports = {
	ping() {
		console.log('templates:', stats());
	}
}
