const dotenv = require("dotenv");
dotenv.config();

const cloudinary = require("cloudinary").v2;

// Cloudinary configurations
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRET_KEY,
});

const options = {
    overwrite: true,
    invalidate: true,
    resource_type: "auto",
};

const uploadImage = (image) => {
    return new Promise((resolve, reject) => {
        cloudinary.uploader.upload(image, options, (error, result) => {
            if(result && result.secure_url) {
                return resolve(result.secure_url);
            }
            return reject({ message: error.message });
        })

    })
}

module.exports = (image) => {
    return new Promise((resolve, reject) => {
        cloudinary.uploader.upload(image, options, (error, result) => {
            if(result && result.secure_url) {
                return resolve(result.secure_url);
            }
            return reject({ message: error.message });
        })

    })
}


module.exports.uploadMultipleImages = async (images) => {
    return new Promise((resolve, reject) => {
        const uploads = images.map((base) => uploadImage(base));
        Promise.all(uploads)
        .then((values) => resolve(values))
        .catch((err) => reject(err));
    })
}