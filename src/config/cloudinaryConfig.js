const cloudinary = require('cloudinary');
cloudinary.config({
cloud_name: 'petplace',
api_key: '356355881741482',
api_secret: '4aw1TK3zX02oKhuSJRPsHPVHYPA'
});

exports.uploads = (file) =>{
    return new Promise(resolve => {
    cloudinary.uploader.upload(file, (result) =>{
    resolve({url: result.url, id: result.public_id})
    }, {resource_type: "auto"})
    })
    }