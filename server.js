var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var multer  = require('multer');
var upload = multer({dest:'tmp/'});
var fileUploadController = require('./server/controllers/fileupload-controller.js');
var getRecordsController = require('./server/controllers/getrecords-controller.js');

var app = express();
mongoose.connect('mongodb://localhost:27017/kaipulla');

app.use('/app', express.static(__dirname + '/app'));
app.use('/node_modules', express.static(__dirname + '/node_modules'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.get('/', function(req, res) {
  res.sendFile(__dirname + "/index.html");
});

//Authentication
app.post('/api/files/upload', upload.any(), fileUploadController.process);
app.post('/api/records/get-records', getRecordsController.getRecords);

app.listen('3000', function(){
  console.log("Listening for localhost 3000");
});
