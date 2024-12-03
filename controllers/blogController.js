const Blog = require('../model/Blog');
const crypto = require('crypto');
const uploadToCloudinary = require('../config/cloudinaryConfig');

const getAllBlogs = async (req, res) => {
    // Look for blogs in database
    const blogs = await Blog.find();

    // If no blogs found
    if (!blogs) return res.status(204).json({ 'message': 'Blogs not found' });

    // If blogs found
    res.json(blogs);
}

const createNewBlog = async (req, res) => {
    // checking for blog details in request
    const { title, image, miniDescription, description } = req.body;
    if (!title || !image || !miniDescription || !description) return res.status(400).json({ 'error': 'Product title, image, mini description, paragraph, points are all required' });

    // if all details are available
    try {
        // Creating new blog date
        const currentDate = new Date();
        const formattedDate = currentDate.toLocaleDateString('en-US', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
        });

        const public_id = crypto.randomBytes(10).toString('hex');
        const imageURL = await uploadToCloudinary(image, public_id);

        // Create new blog in database
        const result = await Blog.create({
            'image': {
                'imageURL': imageURL,
                public_id
            },
            'title': title,
            'miniDescription': miniDescription,
            'description': description,
            'date': formattedDate
        });

        console.log(result);
        res.status(201).json({ 'message': 'New Blog Created Successfully' });
    } catch (err) {
        res.status(500).json({ 'error': err.message });
    }
}

const updateBlog = async (req, res) => {
    // Searching specific blog in database
    const { id } = req.body;

    // If no id found in req.body
    if (!id) return res.status(400).json({ 'error': 'Id required' });

    const blog = await Blog.findOne({ _id: id }).exec();

    // if blog is not available in database
    if (!blog) return res.status(204).json({ 'error': 'Blog not found' });

    // If blog found
    if (req.body?.title) blog.title = req.body.title;
    if (req.body?.image) {
        const public_id = crypto.randomBytes(10).toString('hex');
        const imageURL = await uploadToCloudinary(req.body.image, public_id);

        blog.image.imageURL = imageURL;
        blog.image.public_id = public_id;
    }
    if (req.body?.miniDescription) blog.miniDescription = req.body.miniDescription;
    if (req.body?.description) blog.description = req.body.description;

    const result = await blog.save();
    res.json(result);
}

const deleteBlog = async (req, res) => {
    const { id } = req.body;

    // if no id found in req.body
    if (!id) return res.status(400).json({ 'error': 'Id required' });

    const blog = await Blog.findOne({ _id: id }).exec();

    // if blog is not available in database
    if (!blog) return res.status(204).json({ 'error': 'Blog not found' });

    const result = await Blog.deleteOne({ _id: id });
    res.json(result);
}

const getBlog = async (req, res) => {
    const { id } = req.params;

    // if no id found in req.body
    if (!id) return res.status(400).json({ 'error': 'Id required' });

    const blog = await Blog.findOne({ _id: id }).exec();

    // if no blogs found
    if (!blog) return res.status(204).json({ 'error': 'Blog not found' });

    res.json(blog);
}

module.exports = {
    getAllBlogs,
    createNewBlog,
    updateBlog,
    deleteBlog,
    getBlog
}