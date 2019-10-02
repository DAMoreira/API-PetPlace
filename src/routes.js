var express         = require('express'),
    routes          = express.Router();
var userController  = require('./controller/user-controller');
var mascotaController = require('./controller/mascota-controller');
var passport	    = require('passport');
 
routes.get('/', (req, res) => {
    return res.send('Hello, this is the API!');
});

//rutas usuario
routes.post('/register', userController.registerUser);
routes.post('/login', userController.loginUser);
routes.post('/login/google', userController.loginGUser);
routes.get('/logout', userController.logoutUser);

//rutas mascota
routes.post('/register', mascotaController.registerMascota);

//jwt con email 
routes.get('/special', passport.authenticate('jwt', { session: false }), (req, res) => {
    return res.json({ msg: `Hey ${req.user.email}! I open at the close.` });
});


 
module.exports = routes;