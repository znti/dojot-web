let stats = require('../utils/Stats');
let http = require('../utils/Http');

module.exports = {
	ping() {
		return new http().get('http://www.mocky.io/v2/5c41a1300f00004b3fe7b8eb').then(response => {
			let message = response.data.message;
			console.log('Retrieved', message);
			return message;
		});
	}

}
