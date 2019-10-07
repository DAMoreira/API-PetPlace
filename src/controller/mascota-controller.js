var Mascota = require('../models/mascota.model');
var config = require('../config/config');
var jwt = require('jsonwebtoken');

//funcion para valdiar token, si esta activo devulve el emial y id del objeto usuario, sino error.
function validarTk(token){
    return jwt.verify(token, config.jwtSecret);
           
}

//metodo de alta de mascota
exports.registerMascota = (req, res) => {
    //if para controlar los datos ingresados, cuando pongo la fecha no me lo toma por eso lo saque :B 
    if (!req.body.nombre || !req.body.raza || !req.body.sexo || !req.body.foto || !req.body.ubicacion || !req.body.token ) {
        return res.status(400).json({ 'msg': 'Revise los campos resaltados' });
    }
//creo la nueva mascota y le asigno el objetId del dueño mediente el token
    let newMascota = Mascota(req.body);
    newMascota.amo = validarTk(req.body.token).id
    newMascota.save((err, mascota) => {
        if (err) {
            return res.status(400).json({ 'msg': err });
        }
        return res.status(201).json( { mascota: (newMascota), 
                                       msj:"Guau! Nuevo Perfil Creado!",
                                       msj2: validarTk(req.body.token)
                                 
        });
    });
};
//metodo para mostrar las mascotas, recibe un token y devuelve las mascotas que coinciten el amo con el objectId del token (que sería la referencia del objeto usuario)
exports.misMascotas = (req, res) =>{
    Mascota.find({ amo: validarTk(req.body.token).id}, (err, mascota)=>{
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
            "descripcion":req.body.descripcion}}
            ,{new:true},
            function(err,mascota){

                if(err){
                    return res.status(400).send({ 'msg': err });
                }
                return res.status(200).json({
                   mascota  
                });
            }
        );
    }