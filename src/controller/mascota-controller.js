var Mascota = require('../models/mascota.model');
var config = require('../config/config');
var Image = require('../controller/image-controller');
var jwt = require('jsonwebtoken');
var cloud = require('../config/cloudinaryConfig');

//funcion para valdiar token, si esta activo devulve el emial y id del objeto usuario, sino error.
function validarTk(token){
    return jwt.verify(token, config.jwtSecret);         
}

function subirImagen(algo) {
    cloud.uploads(algo).then((result) => {
        var imageDetails = {
        imageName: "ASDASDASdfDdasASDASDA",
        cloudImage: result.url,
        imageId: result.id,
        
        }
        console.log(imageDetails.cloudImage);
                return imageDetails.cloudImage;
       
        //THEN CREATE THE FILE IN THE DATABASE   
    })
}

//metodo de alta de mascota
exports.registerMascota = (req, res) => {

    //if para controlar los datos ingresados, cuando pongo la fecha no me lo toma por eso lo saque :B 
    if (!req.body.nombre || !req.body.raza || !req.body.sexo /*|| !req.body.foto*/ || !req.body.ubicacion || !req.body.token ) {
        return res.status(400).json({ 'msg': 'Revise los campos resaltados' });
    }

    var aux = subirImagen(req.body.foto);

//creo la nueva mascota y le asigno el objetId del dueño mediente el token
    let newMascota = Mascota(req.body);
    newMascota.amo = validarTk(req.body.token).id;
    //console.log(subirImagen(req.body.foto));
    
    

    newMascota.foto = aux;
 



    


  //  newMascota.foto = Image.createApp(req.body.foto);
    newMascota.save((err, mascota) => {
        if (err) {
            return res.status(400).json({ 'msg': err });
        }
        return res.status(201).json( { mascota: (newMascota), 
                                       msj:"Guau! Nuevo Perfil Creado!",
                                       msj2: validarTk(req.body.token),
                                       msj3: req.user.id,
                                 
        });
    });

    /*Mascota.findOneAndUpdate(
        {"_id": aux},
        {$set: {"foto": subirImagen(req.body.foto)}},
        {new : true},function(err,mascota){
            if(err){
                return res.status(400).send({ 'msg': err });
            }
            return res.status(200).json({mascota,msj:"Guau! Perfil Modificado!"
            });
        }
    );*/
};
//metodo para mostrar las mascotas, recibe un token y devuelve las mascotas que coinciten el amo con el objectId del token (que sería la referencia del objeto usuario)
exports.misMascotas = (req, res) =>{
    Mascota.find({ amo: req.user.id}, (err, mascota)=>{
        if(err){
            return res.status(400).send({ 'msg': err });
        }
        return res.status(200).json({
           mascota
        });   
}
    )};

exports.getAllMascotas = (req, res) =>{
    Mascota.find({}, (err, mascota)=>{
        if(err){
            return res.status(400).send({ 'msg': err });
        }
        return res.status(200).json({
           mascota
        });   
}
    )};

exports.modifyMascota = (req, res) => {
        //if para controlar los datos ingresados, cuando pongo la fecha no me lo toma por eso lo saque :B 
    if (!req.body.nombre || !req.body.raza || !req.body.sexo || !req.body.foto || !req.body.ubicacion || !req.body.token ) {
        return res.status(400).json({ 'msg': 'Revise los campos resaltados' });
    }
        
    Mascota.findOneAndUpdate(
        {"_id": req.body._id},
        {$set: {"nombre": req.body.nombre, "raza":req.body.raza, "sexo":req.body.sexo,"nroPariciones":req.body.nroPariciones,
        "fNacimiento":req.body.fNacimiento,"foto":req.body.foto,"ubicacion":req.body.ubicacion,"pedigree":req.body.pedigree,
        "descripcion":req.body.descripcion}},
        {new : true},function(err,mascota){
            if(err){
                return res.status(400).send({ 'msg': err });
            }
            return res.status(200).json({mascota,msj:"Guau! Perfil Modificado!"
            });
        }
    );
}