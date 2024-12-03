const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadToCloudinary = async (image, public_id) => {
    try {
        const response = await cloudinary.uploader.upload(image, {
            resource_type: 'auto',
            public_id
        })

        return response.secure_url;
    } catch (err) {
        console.log(err);
    }
}

module.exports = uploadToCloudinary;