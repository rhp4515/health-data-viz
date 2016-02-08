var fs = require('fs');
var cli = require('cli');
var mongoose = require('mongoose');
var BlueButton = require('bluebutton');
var User = require('../datasets/users');

function insert_user_data(a, b) {
	var user = new User;
	user.name = a.name.given[0];
	user.telephone = a.phone.home.replace(/tel:/i,'');
	user.street = a.address.street[0];
	user.city = a.address.city;
	user.state = a.address.state;
	user.results = b;
	// console.log(user);
	// user.save();	
}

module.exports.process = function(req, res, next) {
   // console.log(req.files);
   // console.log(req.files[0].path);
   // console.log(req.files[0].mimetype);

   //TODO: Check for validation of file type
   for(var i=0; i<req.files.length; i++) {
  	   var d = req.files[i];
  	   // console.log(d);
	   var out_file = d.originalname.replace(/.xml/i, '.json');
	   var file = __dirname + "/../out/" + out_file;
	   
	   var xml = fs.readFileSync(req.files[i].path, 'utf-8');
	   var myRecord = BlueButton(xml);

	   var r = JSON.parse(myRecord.data.json());
	   insert_user_data(r.demographics, r.results);
	   
	   fs.writeFile(file, myRecord.data.json(), function (err) {
	         if( err ){
	              console.log( err );
	         } else{
	               response = {
	                   message:'File converted successfully',
	                   filename:d.originalname
	              };
	          }
	          //console.log( response );
	          res.end( JSON.stringify( response ) );
	       });
	   //Delete the uploaded file (No use)
	   fs.unlinkSync(d.path);
	}
}
