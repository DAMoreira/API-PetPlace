var express         = require('express'),
    routes          = express.Router();
var userController  = require('./controller/user-controller');
var mascotaController = require('./controller/mascota-controller');
var passport	    = require('passport');
const auth = require('./controller/auth');
 
routes.get('/', (req, res) => {
    return res.send('Hello, this is the API!');
});

//rutas usuario
routes.post('/register', userController.registerUser); //deberíamos agregar los headers en las rutas para verificar el token
routes.post('/login', userController.loginUser);
routes.post('/login/google', userController.loginGUser);
routes.get('/logout', userController.logoutUser);
routes.post('/control',userController.controlUser);

//rutas mascota
routes.post('/registerM', mascotaController.registerMascota);
routes.post('/misMascotas', mascotaController.misMascotas);

//jwt con email 
routes.get('/special', passport.authenticate('jwt', { session: false }), (req, res) => {
    return res.json({ msg: `Hey ${req.user.email}! I open at the close.` });
});


 
module.exports = routes;