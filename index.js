//Express initialization
var express = require('express');
var app = express();

app.get('/', function (request, response) {
	response.sendFile('login.html', {
		root: __dirname
	});
});

app.listen(process.env.PORT || 3000);