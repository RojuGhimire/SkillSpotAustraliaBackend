const Testimonial = require('../model/Testimonial');
const crypto = require('crypto');
const uploadToCloudinary = require('../config/cloudinaryConfig');

const getAllTestimonial = async (req, res) => {
    // Fetching all testimonials
    const testimonials = await Testimonial.find();

    // if no testimonial found in database
    if (!testimonials) return res.status(204).json({ 'error': 'Testimonials not found' });

    // if testimonials found
    res.json(testimonials);
}

const createNewTestimonial = async (req, res) => {
    // Check for notice details in request
    const { fullName, image, statement } = req.body;

    // If details not found
    if (!fullName || !image || !statement) return res.status(400).json({ 'error': 'Firstname, lastname, image and statement of a Testimonial giver is required' });

    const public_id = crypto.randomBytes(10).toString('hex');
    const imageURL = await uploadToCloudinary(image, public_id);

    // if all details are availbale
    try {
        // Create new testimonial
        const result = await Testimonial.create({
            'image': {
                'imageURL': imageURL,
                public_id
            },
            'fullName': fullName,
            'statement': statement
        });

        console.log(result);
        res.status(201).json({ 'success': 'New Testimonial Created Successfully' });
    } catch (err) {
        console.log(err);
        res.status(500).json({ 'error': err.message });
    }
}

const updateTestimonial = async (req, res) => {
    // Searching specific testimonial in database
    const { id } = req.body;

    // if no id found in req.body
    if (!id) return res.status(400).json({ 'error': 'Id required' });

    const testimonial = await Testimonial.findOne({ _id: id }).exec();

    // if no testimonial available in database
    if (!testimonial) return res.status(204).json({ 'error': 'Testimonial not found' });

    if (req.body?.image) {
        const public_id = crypto.randomBytes(10).toString('hex');
        const imageURL = await uploadToCloudinary(req.body.image, public_id);

        testimonial.image.imageURL = imageURL;
        testimonial.image.public_id = public_id;
    }
    if (req.body?.fullName) testimonial.fullName = req.body.fullName;
    if (req.body?.statement) testimonial.statement = req.body.statement;

    const result = await testimonial.save();
    res.json(result);
}

const deleteTestimonial = async (req, res) => {
    // searching specific testimonial in database
    const { id } = req.body;

    // if no id found in req.body
    if (!id) return res.status(400).json({ 'error': 'Id required' });

    const testimonial = await Testimonial.findOne({ _id: id }).exec();

    // if testimonial not available in database
    if (!testimonial) return res.status(204).json({ 'error': 'Testimonial not found' });

    const result = await Testimonial.deleteOne({ _id: id });
    res.json(result);
}

const getTestimonial = async (req, res) => {
    // searching specific testimonial in database
    const { id } = req.params;

    // if no id found in params
    if (!id) return res.status(400).json({ 'error': 'Id required' });

    const testimonial = await Testimonial.findOne({ _id: id }).exec();

    // if no testimonial found
    if (!testimonial) return res.status(204).json({ 'error': 'Testimonial not found' });

    res.json(testimonial);
}

module.exports = {
    getAllTestimonial,
    createNewTestimonial,
    updateTestimonial,
    deleteTestimonial,
    getTestimonial
}