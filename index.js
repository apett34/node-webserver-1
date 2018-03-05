const express = require('express');
const hbs = require('hbs'); // Handlebars
const fs = require('fs'); 	// File System

const port = process.env.PORT || 3000;
var	app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');


// Create some middelware
app.use((req, res, next) => {
	var log = '';
	var now = new Date().toString();
	log = now;
	log += ': '
	log += req.method;
	log += ' ';
	log += req.url;
	console.log(log);
	fs.appendFile('server.log', log + '\n', (err) => {
		if (err) {
			console.log('Unable to append to server.log');
		}
	});
	next();
});


// Create some middelware
/*
app.use((req, res, next) => {
	res.render('maintenance.hbs');
});
*/

app.use(express.static(__dirname + '/public')); // app.use registrerer middleware


hbs.registerHelper('getCurrentYear', () => {
	return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
	return text.toUpperCase();
});

app.get('/', function(req, res){		// registrer en handler
	console.log('Root page visited.');
	res.render('home.hbs', {
		welcomeMessage: 'Hello World!',
		pageTitle: 'Home Page'
	});

});


app.get('/about', function(req, res){
	console.log('About page visited.');
	res.render('about.hbs', {
		pageTitle: 'About Page'
	});
});


var	server = app.listen(port, function(){
	//var	host = server.address().address;
	//var port = server.address().port;
	//console.log("Server listening at http://%s:%s", host, port);
	console.log('Server is up on port ' + port);
});
