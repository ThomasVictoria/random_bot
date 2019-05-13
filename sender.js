var request = require('request-promise');

class Message {
	constructor(text) {
		this.options = {
			method: 'POST',
	    uri: process.env.CHANNEL_URL,
	    body: {
	        text: text
	    },
	    json: true
	  }
	}

	send () {
		request(this.options).then( res => {
	  	console.log("Message sent")
	  }).catch( err => {
	  	if(process.env.DEBUG_SLACK)
	  		console.log(err)
	  	else
	  		console.log('Not sent')
	  })
	}
}

exports.Message = Message