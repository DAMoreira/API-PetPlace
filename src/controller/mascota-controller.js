var Mascota = require('../models/mascota.model');
var Match = require('../models/match.model');
var MatchController = require('../controller/match-controller');
var config = require('../config/config');
var Image = require('../controller/image-controller');
var jwt = require('jsonwebtoken');
var cloud = require('../config/cloudinaryConfig');
var ObjectId = require('mongodb').ObjectID;


//funcion para valdiar token, si esta activo devulve el emial y id del objeto usuario, sino error.
function validarTk(token){
    return jwt.verify(token, config.jwtSecret);         
}

async function subirImagen(foto)
{
    return new Promise(function (resolve, reject) {
        cloud.uploads(foto).then((result) => {
            var imageDetails = {
            imageName: "AS111",
            cloudImage: result.url,
            imageId: result.id,
            }
        resolve(imageDetails.cloudImage);
      });
    });
}
async function imageUrl(unaFoto)
{
    // return a new promise to use in subsequent operations
   
     await subirImagen(unaFoto)
        .then(function(imageDetails) {
            console.log("soy imaeurl: "+imageDetails);
            this.x= imageDetails;
            console.log("esto es x: "+this.x);
             return this.x
        });
}



//metodo de alta de mascota
exports.registerMascota = (req, res) => {

    //if para controlar los datos ingresados, cuando pongo la fecha no me lo toma por eso lo saque :B 
    if (!req.body.nombre || !req.body.raza || !req.body.sexo /*|| !req.body.foto*/ || !req.body.ubicacion || !req.body.token ) {
        return res.status(400).json({ 'msg': 'Revise los campos resaltados' });
    }
  
//creo la nueva mascota y le asigno el objetId del dueño mediente el token
    let newMascota = Mascota(req.body);
    newMascota.amo = validarTk(req.body.token).id;
  //   fotoPerfil = req.files[0].path;
    
  
 /*  async function modifyfoto(fotoPerfil){
    
     await imageUrl(fotoPerfil);
     newMascota.foto= this.x;
  
   
     }
     modifyfoto(fotoPerfil);*/

     
 /* async function guardar(){
  await modifyfoto(fotoPerfil);*/
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
     }
//guardar();

    //};
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

exports.getAllMascotasCustom = (req, res) =>{
    console.log(req.user.id);
  
    Mascota.aggregate([
    
        {$lookup:{
            from: "matches",
            localField: "_id",
            foreignField:"mascotaRece",
            as:"matchInfo"
        }},
        //{ $unwind: {path: "$matchInfo", preserveNullAndEmptyArrays: true }},
        {$match: {$or: [  {"matchInfo.emisor":  ObjectId(req.user.id)}, { "matchInfo":null} ] }, },
        /*}{$group: {
            _id: "$_id",
            matchInfo: {$addToSet: {"estado":"null"}}
            }
        }*/
       
    
    ]).exec((err, result)=>{
        if (err) {
            console.log("error" ,err)
        }
        if (result) {
          
            return  res.status(200).json({
                result
             });   
        }
  });
};

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
exports.borrarMascota = (req, res) =>{
    Mascota.findByIdAndDelete(req.body._id, (err, mascota) => {
        if (err) return res.status(500).json({ 'msg': err });  
       
        return res.status(200).json( { 
            msj: "Tu mascota " + mascota.nombre + " ha sido eliminada",
            id: mascota._id
      
        });
    })
};

exports.getMascotaByID = (req, res) =>{
    Mascota.findById(req.body._id, (err, mascota)=>{
        console.log(req.body._id)
        if (err){
            return res.status(500).json({'msg':err});
        }
        if (mascota==null){
            return res.status(200).json({msj:'el ID de mascota no existe'}) 
        }
        else{
            console.log(mascota)
            return res.status(200).json({mascota});
            
        }
    })
}

exports.getMascotaByIDAux = (req, res) =>{
    Mascota.findById(req, (err, mascota)=>{
        console.log(req)
        if (err){
            return res.status(500).json({'msg':err});
        }
        if (mascota==null){
            return res.status(200).json({msj:'el ID de mascota no existe'}) 
        }
        else{
            console.log(mascota)
            return res.status(200).json({mascota});
            
        }
    })
}
    