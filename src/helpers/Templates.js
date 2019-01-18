let stats = require('../utils/Stats');

let http = require('../utils/Http');

module.exports = {
	ping() {
		return new http().get('http://www.mocky.io/v2/5c40d0180f00002a24e7b67c').then(response => {
			let message = response.data.message;
			console.log('Retrieved', message);
			return message;
		});
	}
}
