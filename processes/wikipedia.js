var request = require('request-promise');

module.exports = async () => {
	let res = await request("https://en.wikipedia.org/w/api.php?action=query&format=json&list=random&rnlimit=1").then(res => {
		return JSON.parse(res)
	})

	return 'https://en.wikipedia.org/wiki?curid='+res.query.random[0].id
}