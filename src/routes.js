var express         = require('express'),
    routes          = express.Router();
var userController  = require('./controller/user-controller');
var mascotaController = require('./controller/mascota-controller');
var passport	    = require('passport');

 
routes.get('/', (req, res) => {
    return res.send('Hello, this is the API!');
});

//rutas usuario
routes.post('/register', userController.registerUser); //deberíamos agregar los headers en las rutas para verificar el token
routes.post('/login', userController.loginUser);
routes.post('/login/google',userController.loginGUser);
routes.get('/logout', userController.logoutUser);
routes.post('/control',passport.authenticate('jwt', { session: false }),userController.controlUser);

//rutas mascota
//routes.post('/registerM', passport.authenticate('jwt', { session: false }),mascotaController.registerMascota);
routes.post('/registerM',passport.authenticate('jwt', { session: false }), mascotaController.registerMascota);
routes.post('/misMascotas', mascotaController.misMascotas);
routes.post('/modificarMascota', mascotaController.modifyMascota);
routes.post('/getAllMascotas', mascotaController.getAllMascotas);

//jwt con email 
routes.get('/special', passport.authenticate('jwt', { session: false }), (req, res) => {
    return res.json({ msg: `Hey ${req.user.email}! I open at the close.` });
});


 
module.exports = routes;