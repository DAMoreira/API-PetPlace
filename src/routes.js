var express         = require('express'),
    routes          = express.Router();
var userController  = require('./controller/user-controller');
var mascotaController = require('./controller/mascota-controller');
var passport	    = require('passport');
var razasController = require('./controller/razas-controller');

var imageController = require('./controller/image-controller.js');
var upload = require('./config/multerConfig');
 
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
routes.post('/registerM', upload.any() ,passport.authenticate('jwt', { session: false }), mascotaController.registerMascota);
routes.get('/misMascotas',passport.authenticate('jwt', { session: false }) ,mascotaController.misMascotas);
routes.post('/modificarMascota',passport.authenticate('jwt', { session: false }), mascotaController.modifyMascota);
routes.get('/getAllMascotas', passport.authenticate('jwt', { session: false }), mascotaController.getAllMascotas);
routes.post('/borrarMascota', passport.authenticate('jwt', { session: false }), mascotaController.borrarMascota);

//razas
routes.post('/registerRaza', razasController.registerRaza); // Cargar las razas en la BD
routes.get('/getAllRazas', razasController.getAllRazas);

//imagenes
routes.post('/addImage', upload.any(), imageController.createApp);
routes.get('/getImageByPet', imageController.getImageByPet);


//jwt con email 
routes.get('/special', passport.authenticate('jwt', { session: false }), (req, res) => {
    return res.json({ msg: `Hey ${req.user.email}! I open at the close.` });
});
routes.get('/token', passport.authenticate('jwt', { session: false }), userController.obternerTUser);


 
module.exports = routes;