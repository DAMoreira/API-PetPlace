var Match = require('../models/match.model');

exports.crearMatch = (req, res) =>{

    let newMatach = Match(req.body);
    newMatach.estado = 'pendiente';

    newMatach.save((err, match) => {    
        if (err) {
            return res.status(400).json({ 'msg': err });
        }

        return res.status(201).json( { match: (newMatach), 
                                       msj:"objeto match creado en mongo",                             
        });
    });
}
exports.aceptarMatch = (req, res) =>{ //recibe el id del match

    Match.findOneAndUpdate(
        {"_id": req.body._id},
        {$set: {"estado": 'aceptado'}},
        {new : true},function(err,match){
            if(err){
                return res.status(400).send({ 'msg': err });
            }
            return res.status(200).json({match,msj:"solicitud aceptada"
            });
        }
    );
}
exports.rechazarMatch = (req, res) =>{ //recibe el id del match

    Match.findOneAndUpdate(
        {"_id": req.body._id},
        {$set: {"estado": 'rechazado'}},
        {new : true},function(err,match){
            if(err){
                return res.status(400).send({ 'msg': err });
            }
            return res.status(200).json({match,msj:"solicitud rechazada"
            });
        }
    );
}

exports.getMatches = (req, res)=>{

   Match.find({ emisor: req.user.id, estado:'aceptado'}).populate("mascotaEmi").exec( (err, match)=>{ //agregar el receptor
        if(err){
            return res.status(400).send({ 'msg': err });
        }
    
        return res.status(200).json({
            match
        });   
     
    })
   };

   exports.getAllMatches = (req, res)=>{

    Match.find({ emisor: req.user.id, receptor: req.user.id}).populate("mascotaEmi").exec( (err, match)=>{ //agregar el receptor
         if(err){
             return res.status(400).send({ 'msg': err });
         }
     
         return res.status(200).json({
             match
         });   
      
     })
    };


exports.solicitudes = (req, res)=>{

    Match.find({ receptor: req.user.id, estado:'pendiente'}, (err, match)=>{
         if(err){
             return res.status(400).send({ 'msg': err });
         }
     
         return res.status(200).json({
             match
         });   
      
     })
 };


