var mongoose = require('mongoose');
var User = require('../datasets/users');

module.exports.getRecords = function(req, res, next) {
	// console.log("getting records");	
	User.find({},{}, function(err, records) {
		res.json({
			status: 200,
			data: records
		});
	});	
}