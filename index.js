//Express initialization
var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var mongoUri = process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || "mongodb://localhost/local_data;"
var MongoClient = require('mongodb').MongoClient, format = require('util').format;
var db = MongoClient.connect(mongoUri, function(error, databaseConnection) {
	db = databaseConnection;
});

app.get('/', function (request, response) {
	response.sendFile('login.html', {
		root: __dirname
	});
});

app.get('/input', function (request, response) {
	response.sendFile('input.html', {
		root: __dirname
	});
});

app.post('/submit_meal', function (request, response) {

})


app.listen(process.env.PORT || 3000);