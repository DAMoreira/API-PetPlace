var express     = require('express');
var bodyParser  = require('body-parser');
var passport	= require('passport');
var mongoose    = require('mongoose');
var config      = require('./config/config');
var port        = process.env.PORT || 5000; 
var cors        = require('cors');
var chat_controller = require('./controller/chat-controller');

var socket = require('socket.io'), http = require('http'),
server = http.createServer(), socket = socket.listen(server);

var app = express();
app.use(cors());

socket.sockets.on('connection', function (socket) {
  chat_controller.respond(socket);
});

socket.sockets.on('connection', function(connection) {
  console.log('User Connected');
  
  connection.on('message', function(msg){
    socket.emit('message', msg);
  });
});
server.listen(port, function(){
  console.log('Server started');
});
 
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
//app.listen(port);
console.log('There will be dragons: http://localhost:' + port);