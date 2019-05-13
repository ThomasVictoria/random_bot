var request = require('request-promise');
const Entities = require('html-entities').AllHtmlEntities;

module.exports = async () => {
	let res = await request('https://api.coindesk.com/v1/bpi/currentprice.json').then(res => {
		return JSON.parse(res)
	})

	let values = ""
	const entities = new Entities();

	for (let bpi in res.bpi) {
		values += `>${res.bpi[bpi].code} ${res.bpi[bpi].rate} ${entities.decode(res.bpi[bpi].symbol)}\n`
	}

	return `*Bitcoin*\n${values}\n_${res.time.updated}_`
}