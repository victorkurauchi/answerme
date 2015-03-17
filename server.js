// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');
var bodyParser = require('body-parser');
var app        = express();
var morgan     = require('morgan');
var cors       = require('cors');
var fs = require('fs');

// configure app
app.use(morgan('dev')); // log requests to the console
app.use(cors());

// configure body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port     = process.env.PORT || 3000; // set our port

var mongoose   = require('mongoose');
mongoose.connect('mongodb://localhost:27017/meresponda'); // connect to our database

// ROUTES FOR OUR API
// =============================================================================

// create our router
var router = express.Router();

// middleware to use for all requests
router.use(function(req, res, next) {
	// do logging
	console.log('Something is happening.');
	next();
});

// dynamically loop through routes folders and require routes passing models
var modelsPath = './app/models/';
var routesPath = './app/routes/';

fs.readdir(routesPath,function(err, files) {

  if(err) throw err;

  files.forEach(function(file){
    var Model = require(modelsPath + file);
    var route = file.replace('.js', '');

    require(routesPath + route)(router, Model);
  });
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
	res.json({ message: 'hooray! welcome to our api!' });	
});

// REGISTER OUR ROUTES -------------------------------
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);
