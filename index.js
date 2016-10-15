//Express initialization
var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var mongoUri = process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || "mongodb://localhost/local_data;"
var MongoClient = require('mongodb').MongoClient, format = require('util').format;
var db = MongoClient.connect(mongoUri, function(error, databaseConnection) {
	db = databaseConnection;
});

app.use(express.static(__dirname));

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


app.post('/inputFood', function (request, response) {
	//enabling CORS
	response.header("Access-Control-Allow-Origin", "*");
    response.header("Access-Control-Allow-Headers", "X-Requested-With");

    console.log(request);

//    var foods{};
//
//  db.collection('carbon', function(er, collection) {
//    	if(!er){
//    		collection.find('name':)
//    	}
//    	else {
//    		response.send('error!');
//    	}
//    })
})


app.listen(process.env.PORT || 3000, function() {
	console.log('Node app is running on port', app.get('port'));
});