var User = require('../models/user');
var jwt = require('jsonwebtoken');
var config = require('../config/config');
 
function createToken(user) {
    return jwt.sign({ id: user.id, email: user.email }, config.jwtSecret, {
        expiresIn: 200 // 86400 expires in 24 hours
      });
    }
function validarTk(req, res){
    payload = jwt.verify(req.body.token, config.jwtSecret);
        return res.status(201).json( {info: payload 
          }); 
      
}


 
exports.registerUser = (req, res) => {
    if (!req.body.email || !req.body.password) {
        return res.status(400).json({ 'msg': 'You need to send email and password' });
    }
 
    User.findOne({ email: req.body.email }, (err, user) => {
        if (err) {
            return res.status(400).json({ 'msg': err });
        }
 
        if (user) {
            return res.status(400).json({ 'msg': 'The user already exists', user });
        }
 
        let newUser = User(req.body);
        newUser.save((err, user) => {
            if (err) {
                return res.status(400).json({ 'msg': err });
            }
            return res.status(201).json( {token: createToken(user),
                                          usuario: (newUser), 
                                        });
        });
    });
};

exports.loginGUser = (req, res) => {
   User.findOne({google_Id : req.body.userId}, (err, user)=>{
    if(err){
        return res.status(400).send({ 'msg': err });   
    }
    if(user == null){
        let usern = new User; 
            usern.name= req.body.givenName;
            usern.lastname= req.body.familyName;
            usern.email= req.body.email;
            usern.username= req.body.email;
            usern.google_Id= req.body.userId; 
        
        usern.save((err, users)=>{
            if (err) {
                return res.status(400).send({ 'msg': err });        
            }
            if (users){
                return res.status(200).json({
                    token: createToken(users),
                    usuario: (users),
                    ok:true,
                  
                });
            }
        });
        
    }
    else{
        return res.status(200).json({
            token: createToken(user),
            usuario: (user),
            ok:true
        });
    }
  
   });
            
        };
       
exports.loginUser = (req, res) => {
    if (!req.body.email || !req.body.password) {
        return res.status(400).send({ 'msg': 'You need to send email and password' });
    }
 
    User.findOne({ email: req.body.email }, (err, user) => {
        if (err) {
            return res.status(400).send({ 'msg': err });
        }
 
        if (!user) {
            return res.status(400).json({ 'msg': 'The user does not exist' });
        }
 
        user.comparePassword(req.body.password, (err, isMatch) => {
            if (isMatch && !err) {
                return res.status(200).json({
                    token: createToken(user),
                    usuario: (user),
                    valido: validarTk(token)
                });
            } else {
                return res.status(400).json({ msg: 'The email and password don\'t match.' });
            }
        });
        
    });
};


exports.logoutUser = (req, res) => {
    
    return res.status(200).json({
        token: null
    });
}
exports.controlUser = (req, res) => {
    
        payload = jwt.verify(req.body.token, config.jwtSecret);
        return res.status(201).json( {info: payload 
          });
}
    



