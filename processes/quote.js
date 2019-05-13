var request = require('request-promise');

module.exports = async () => {
	let res = await request('https://quota.glitch.me/random').then(res => {
		return JSON.parse(res)
	})

	return `>${res.quoteText}\n*${res.quoteAuthor}*`
}