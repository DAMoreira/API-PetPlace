var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var MatchSchema = new mongoose.Schema({
    estado:{
        type: String,
        required: true
    },
    receptor:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    emisor:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    mascotaEmi:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Mascota"
    },
    mascotaRece:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Mascota"
    },
});



module.exports = mongoose.model('Match', MatchSchema);