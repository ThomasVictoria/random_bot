var request = require('request-promise');

module.exports = async () => {
	let res = await request('https://some-random-api.ml/meme').then(res => {
		return JSON.parse(res)
	})
	return res.url
}