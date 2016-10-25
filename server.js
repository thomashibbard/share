'use strict';

var express = require('express')
	, app = express()
	, Promise = require('bluebird')
	, fs = Promise.promisifyAll(require("fs"))
	, path = require('path')

;

const CWD = process.cwd();
//location of fiddles
const fiddles = path.join(__dirname, 'fiddles');



fs.readdirAsync(fiddles).bind({})
	.then(fiddleFilesArr => {
		// checkHashExists(fiddleFiles, hashTestStr);
		var hash = getHash(fiddleFilesArr);
		var hashedDir = path.join(fiddles, hash);
		return fs.mkdirAsync(hashedDir);
})
	.then( (data) => {
		console.log('expected fname to be', this.fname)
	})
	.catch(err => {
		console.error('error reading fiddles dir', err);
	});



function getHash(fiddleFilesArr = []) {
	// console.log('arr', fiddleFilesArr)
	var hashToAttempt = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 12);
	//NOT there
	if (fiddleFilesArr.indexOf(hashToAttempt) === -1) {
		// console.log('NOT there', hashToAttempt, fiddleFilesArr);
		 return hashToAttempt;
	} else {
		//is THERE
		// console.log('IS there', hashToAttempt)
		return hashToAttempt
	}
	return hashToAttempt;
}