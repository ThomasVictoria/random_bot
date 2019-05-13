"use strict";

require('dotenv').config()
var express = require('express');
var app = express();
var CronJob = require('cron').CronJob;
var rc = require('random-cron');
var processes = require('./process.js')

// For debugging uncomment this line. Enter the name of the process you want to test to diabled randomness
// processes()

const cronArray = []
// Each day of the working week 2am
new CronJob('0 0 2 * * 1-5', function() {
	
	// Stop all cron already running
	for(let cron in cronArray) {
		cronArray[cron].stop()
	}

	// Empty running cron
	cronArray = []

	// Get random cron between 11am and 4pm at a random minute
	var job = rc.some("hour").between(11, 16).some("minute").between(0, 59).generate();

	// Define cron
	let cron = new CronJob(`0 ${job.substring(0,job.length-2)} 1-5`, function() {
		// Execute processes
		processes()
	})

	// Fill cron stack
	cronArray.push(cron)

	// Start all cron in cron stack
	for(let cron in cronArray) {
		cronArray[cron].start()
	}
});

app.listen(3000, () => {
	console.log('Running on 3000');
});