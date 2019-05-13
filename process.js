var glob 		= require("glob")
var Message = require('./sender.js').Message;
var request = require('request-promise');

module.exports = (name) => {

	var getDirectories = function (src, callback) {
	  glob(src + '/**/*', callback);
	};

	getDirectories('processes', async function (err, res) {
	  if (err) {
	    console.log('Error', err);
	  } else {
	  	var p
	  	if(name) {
				p = require(`./processes/${name}.js`)
	  	} else {
		  	let n = await request({
					method: 'POST',
			    uri: "https://api.random.org/json-rpc/2/invoke",
			    body: {
					    "jsonrpc": "2.0",
					    "method": "generateIntegers",
					    "params": {
					        "apiKey": process.env.RANDOM_ORG,
					        "n": 1,
					        "min": 0,
					        "max": res.length-1,
					        "replacement": true,
					        "base": 10
					    },
					    "id": 9598
					},
			    json: true
			  }).then(res => {
			  	return res.result.random.data[0]
			  }).catch(e => {
			  	console.log(e)
			  })

		    p = require(`./${res[n]}`)
	  	}

	    let m = await p()	  			
	    let message = new Message(m)
	    message.send()
	  }
	});

}