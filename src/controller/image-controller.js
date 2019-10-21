//IMPORT THE MODEL WE CREATED EARLIER
var imageModel = require('../models/image.model');
var image = require('../models/images.model')
//IMPORT CLOUDINARY CONFIG HERE
var cloud = require('../config/cloudinaryConfig');

const fs = require('fs');
exports.createApp = (req, res) => {
  console.log(req.files[0].path);
try{
    var imageDetails = {
       imageName: "asdasd.jpg",
     }
//USING MONGO METHOD TO FINE IF IMAGE-NAME EXIST IN THE DB
     imageModel.find({imageName: imageDetails.imageName}, (err,          callback) => {
//CHECKING IF ERROR OCCURRED      
 if (err) {
           res.json({
                      err: err,
                      message: 'there was a problem uploading image'
           })
} else if(callback.length >= 1 ) {
res.json({
message: 'file already exist'
})
}else {
var imageDetails = {
imageName: "asdasd.jpg",
cloudImage: req.files[0].path,
//cloudImage: console.log(req.files[0].path),
imageId: ''
}
// IF ALL THING GO WELL, POST THE IMAGE TO CLOUDINARY
cloud.uploads(imageDetails.cloudImage).then((result) => {
var imageDetails = {
imageName:"asdasd.jpg",
cloudImage: result.url,
imageId: result.id
}
//THEN CREATE THE FILE IN THE DATABASE
imageModel.create(imageDetails, (err, created)=> {
if(err){
res.json({
err: err,
message: 'could not upload image, try again'
})
}else {
res.json({
created: created,
message: "image uploaded successfully!!"
})
/*try {
     fs.unlinkSync(".\\".concat(req.body.cloudImage))
     //file removed
   } catch(err) {
     console.error(err)
   }*/
}

})
})
}
});
}catch(execptions){
console.log(execptions)
}
}


exports.getImageByPet = (req, res) => {
  imageModel.findOne({ imageName: req.body.imageName }).then((result) => {
      res.status(200).send(result);
  });
};



  exports.uploadImage = (req,res, next) =>{ 
  // Create a new image model and fill the properties
  let newImage = new image;
  newImage.filename = "alfo";
  newImage.originalName = "nombre original";
  newImage.desc = "una descripcion"
  newImage.save(err => {
      if (err) {
          return res.sendStatus(400);
      }
      res.status(201).send({ newImage });
  });
};
