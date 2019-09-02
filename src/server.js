var express     = require('express');
var bodyParser  = require('body-parser');
var passport	= require('passport');
var mongoose    = require('mongoose');
var config      = require('./config/config');
var port        = process.env.PORT || 5000; 
var cors        = require('cors');
 
var app = express();
app.use(cors({
	origin: '*'
}));

/*
Este metodo en teroia permite la comunicación HTTP a HTTPS pero no funciona
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods','GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
})*/
 
// get our request parameters
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
 
// Use the passport package in our application
app.use(passport.initialize());
var passportMiddleware = require('./middleware/passport');
passport.use(passportMiddleware);
 
// Demo Route (GET http://localhost:5000)
app.get('/', function(req, res) {
  return res.send('Hello! The API is at http://localhost:' + port + '/api');
});
 
var routes = require('./routes');
app.use('/api', routes);
 
mongoose.connect('mongodb+srv://admin:admin@cluster0-cchwr.mongodb.net/test?retryWrites=true&w=majority', { useNewUrlParser: true , useCreateIndex: true});
 
const connection = mongoose.connection;
 
connection.once('open', () => {
    console.log('MongoDB database connection established successfully!');
});
 
connection.on('error', (err) => {
    console.log("MongoDB connection error. Please make sure MongoDB is running. " + err);
    process.exit();
});
 
// Start the server
app.listen(port);
console.log('There will be dragons: http://localhost:' + port);