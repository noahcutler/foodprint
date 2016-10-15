//Express initialization
var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); // Required if we need to use HTTP query or post parameters

var mongoUri = process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || "mongodb://localhost/local_data;"
var MongoClient = require('mongodb').MongoClient, format = require('util').format;
var db = MongoClient.connect(mongoUri, function(error, databaseConnection) {
	db = databaseConnection;
});

app.set('port', (process.env.PORT || 5000));

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

    console.log(request.body);
    response.sendFile('input.html', {
    	root: __dirname
    });

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