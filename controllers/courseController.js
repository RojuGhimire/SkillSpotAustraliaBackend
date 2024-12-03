const Course = require('../model/Course');
const crypto = require('crypto');
const uploadToCloudinary = require('../config/cloudinaryConfig');

const getAllCourse = async (req, res) => {
    const courses = await Course.find();

    if (courses.length === 0) return res.status(204).json({ 'error': 'Courses not found' });

    res.json(courses);
}

const createNewCourse = async (req, res) => {
    const { image, courseCode, courseName, courseType, courseIntroduction, offeredBy, duration } = req.body;

    if (!courseCode || !courseName || !courseType || !image || !courseIntroduction || !offeredBy || !duration) return res.status(400).json({ 'error': 'Course code, name and type are all required' });

    const public_id = crypto.randomBytes(10).toString('hex');
    const imageURL = await uploadToCloudinary(image, public_id);

    try {
        const result = await Course.create({
            'image': {
                'imageURL': imageURL,
                public_id
            },
            'courseCode': courseCode,
            'courseName': courseName,
            'courseType': courseType,
            'courseIntroduction': courseIntroduction,
            'offeredBy': offeredBy,
            'duration': duration
        });

        console.log(result);
        res.status(201).json({ 'success': 'New course created successfully' });
    } catch (err) {
        res.status(500).json({ 'error': err.message });
    }
}

const updateCourse = async (req, res) => {
    const { id } = req.body;

    if (!id) return res.status(400).json({ 'error': 'Id required' });

    const course = await Course.findOne({ _id: id }).exec();

    if (!course) return res.status(204).json({ 'error': 'Course not found' });

    if (req.body?.image) {
        const public_id = crypto.randomBytes(10).toString('hex');
        const imageURL = await uploadToCloudinary(req.body.image, public_id);

        course.image.imageURL = imageURL;
        course.image.public_id = public_id;
    }
    if (req.body?.courseCode) course.courseCode = req.body.courseCode;
    if (req.body?.courseName) course.courseName = req.body.courseName;
    if (req.body?.courseType) course.courseType = req.body.courseType;
    if (req.body?.courseIntroduction) course.courseIntroduction = req.body.courseIntroduction;
    if (req.body?.offeredBy) course.offeredBy = req.body.offeredBy;
    if (req.body?.duration) course.duration = req.body.duration;

    const result = await course.save();
    res.json(result);
}

const deleteCourse = async (req, res) => {
    const { id } = req.body;

    if (!id) return res.status(400).json({ 'error': 'Id required' });

    const course = await Course.findOne({ _id: id }).exec();

    if (!course) return res.status(204).json({ 'error': 'Course not found' });

    const result = await Course.deleteOne({ _id: id });
    res.json(result);
}

const getCourse = async (req, res) => {
    const { id } = req.params;

    if (!id) return res.status(400).json({ 'error': 'Id required' });

    const course = await Course.findOne({ _id: id }).exec();

    if (!course) return res.status(204).json({ 'error': 'Course not found' });

    res.json(course);
}

module.exports = {
    getAllCourse,
    createNewCourse,
    updateCourse,
    deleteCourse,
    getCourse,
}
