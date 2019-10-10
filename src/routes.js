var express         = require('express'),
    routes          = express.Router();
var userController  = require('./controller/user-controller');
var mascotaController = require('./controller/mascota-controller');
var passport	    = require('passport');
var razasController = require('./controller/razas-controller');


 
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
routes.post('/registerRaza', razasController.registerRaza); // Cargar las razas en la BD


//jwt con email 
routes.get('/special', passport.authenticate('jwt', { session: false }), (req, res) => {
    return res.json({ msg: `Hey ${req.user.email}! I open at the close.` });
});
<<<<<<< HEAD
routes.get('/token', passport.authenticate('jwt', { session: false }), userController.obternerTUser);
=======

>>>>>>> 7d18d0fb71f2f46ce9c629fa9bcff28d69176d8d

 
module.exports = routes;