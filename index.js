#! /usr/bin/env node

'use strict';

var express = require('express')
	, app = express()
	, Promise = require('bluebird')
	, fs = Promise.promisifyAll(require('fs-extra'))
	, path = require('path')

;

const CWD = process.cwd();
//location of fiddles
const fiddles = path.join(__dirname, 'fiddles');

//ignore files in git ignore
const itemsToFilter = fs.readFileSync('.gitignore', 'utf8').split(/\s/).filter(Boolean);

fs.readdirAsync(fiddles)
	//bluebird bind allows to send data through the promise chain
	.bind({})
	.then(fiddleFilesArr => {
		var hash = getHash(fiddleFilesArr);
		this.hashedDir = path.join('../', 'fiddles', hash);
		return fs.mkdirAsync(this.hashedDir);
	})
	.then(() => {
		console.log('directory created: ', this.hashedDir);
		//return fs.copyAsync(CWD, this.hashedDir, {filter: /.*?node_modules.*?/})
		return fs.copyAsync('.', this.hashedDir, {filter: filterFn});
	})
	.then(() => {
		//push fiddles to heroku and run a build
		console.log('copied...');

		//print link to site in terminal
	})
	.catch(err => {
		console.error('error reading fiddles dir', err);
	});



function filterFn(path){
	var re = new RegExp(itemsToFilter.join('|'));
	return !re.test(path);
}








function getHash(fiddleFilesArr = []) {
	var hashToAttempt = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 12);
	if (fiddleFilesArr.indexOf(hashToAttempt) === -1) {
		//does not exist;
		 return hashToAttempt;
	} else {
		//exists
		return hashToAttempt
	}
	return hashToAttempt;
}