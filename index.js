//Express initialization
var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); // Required if we need to use HTTP query or post parameters

var mongoUri = process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || "mongodb://heroku_391xjwmx:rkshbjh5bs6r6v6rga7vbbrsrc@ds023485.mlab.com:23485/heroku_391xjwmx"
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

    var total_carbon = 0;
    var max_carbon = 0;

    //console.log(foods);


	db.collection('carbon', function(er, collection) {
    	if(!er){
			collection.find().toArray(function(err, curr_food) {
				for(var i = 0; i < curr_food.length; i++){
					for(var key in request.body) {
						//console.log(curr_food[i]);
						if(curr_food[i].name == request.body[key]){
							if(curr_food[i].carbon > max_carbon)
								max_carbon = curr_food[i].carbon;
							total_carbon += curr_food[i].carbon;
						}
					}
				}
				var data = {'total_carbon': total_carbon,
				'max_carbon': max_carbon};
				console.log(data);
			});
    	}
    	else {
    		console.log('db error');
    		response.send('error!');
    	}
	})	


        response.sendFile('input.html', {
    	root: __dirname
    });
})


app.listen(process.env.PORT || 3000, function() {
	console.log('Node app is running on port', app.get('port'));
});