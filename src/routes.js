var express         = require('express'),
    routes          = express.Router();
var userController  = require('./controller/user-controller');
var mascotaController = require('./controller/mascota-controller');
var passport	    = require('passport');
var razasController = require('./controller/razas-controller');
var matchController = require('./controller/match-controller')

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
routes.post('/getMascotaByID', passport.authenticate('jwt', { session: false }),mascotaController.getMascotaByID);
routes.get('/custom',passport.authenticate('jwt', { session: false }) ,mascotaController.getAllMascotasCustom);

//Match
routes.post('/crearMatch',passport.authenticate('jwt', {session: false}), matchController.crearMatch);
routes.post('/aceptarMatch',passport.authenticate('jwt', {session: false}), matchController.aceptarMatch);
routes.post('/rechazarMatch',passport.authenticate('jwt', {session: false}), matchController.rechazarMatch);
routes.get('/misMatch',passport.authenticate('jwt', {session: false}), matchController.getMatches);
routes.get('/todosMisMatch',passport.authenticate('jwt', {session: false}), matchController.getAllMatches);
routes.get('/solicitudes',passport.authenticate('jwt', {session: false}), matchController.solicitudes);

//razas
routes.post('/registerRaza', razasController.registerRaza); // Cargar las razas en la BD
routes.get('/getAllRazas', razasController.getAllRazas);

//imagenes
routes.post('/addImage', upload.any(), imageController.createApp);
routes.get('/getImageByPet', imageController.getImageByPet);
routes.post('/images', upload.single('image'), imageController.uploadImage); 

//jwt con email 
routes.get('/special', passport.authenticate('jwt', { session: false }), (req, res) => {
    return res.json({ msg: `Hey ${req.user.email}! I open at the close.` });
});
routes.get('/token', passport.authenticate('jwt', { session: false }), userController.obternerTUser);


 
module.exports = routes;