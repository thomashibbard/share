var Promise = require('bluebird')
, fs = Promise.promisifyAll(require('fs-extra'));
// fs = require('fs-extra');

// fs.copyAsync('.', '../testDir1', {filter: 'node_modules'})
// 	.then( function(){
// 		cosole.log('done', arguments);
// 	})
// 	.catch((err) => {
// 		console.error('error', err)
// 	});
var itemsToFilter = ['node_modules', 'testDir'];
function filterFn(path){
	var re = new RegExp(itemsToFilter.join('|'));
	console.log(re);
	return !re.test(path);
}
// fs.copy('.', '../testdir12', {filter: filterFn}, function(err){
// 	if(err){
// 		console.error('err', err);
// 	}
// 	console.log('done', arguments)
// })

fs.copyAsync('.', '../testdir12', {filter: filterFn})
.then(function(){
	console.log('done');
})
.catch(function(err){
	console.error('err', err)
})