const mongoose = require('mongoose');
const Client = require('../model/Client');
const Admin = require('../model/Admin');
const path = require('path');

const getAllClient = async (req, res) => {
    const clients = await Client.find({}, { fullname: 1, email: 1, enrolledCourses: 1, certificates: 1 });

    if (!clients) return res.status(204).json({ 'message': 'Clients not found' });

    res.json(clients);
}

const getClient = async (req, res) => {
    const { id } = req.params;

    if (!id) return res.status(204).json({ 'message': 'User Id required' });

    const client = await Client.findOne({ _id: id }, { fullname: 1, email: 1, number: 1, enrolledCourses: 1, certificates: 1 }).exec();

    if (!client) return res.status(404).json({ 'message': 'Client not found' });

    res.json(client);
}

const getAllAdmin = async (req, res) => {
    const admins = await Admin.find({}, { username: 1, roles: 1 });

    if (!admins) return res.status(204).json({ 'message': 'Admins not found' });

    res.json(admins);
}

const addCourse = async (req, res) => {
    const { id, course } = req.body;

    if (!id || !course) return res.status(400).json({ 'message': 'User Id and course are required' });

    const client = await Client.findOne({ _id: id }).exec();

    if (!client) return res.status(404).json({ 'error': 'Client not found' });

    const courseExists = client.enrolledCourses.some((enrolled) => enrolled.course === course);

    if (courseExists) return res.status(409).json({ 'error': 'Course already exists' });

    try {
        const result = await Client.findOneAndUpdate(
            { _id: id },
            {
                $push: {
                    'enrolledCourses': {
                        'course': course
                    }
                }
            },
            {
                projection: {
                    fullname: 1, email: 1, enrolledCourses: 1, certificates: 1,
                }
            }
        );
        res.status(201).json(result);
    } catch (err) {
        console.log(err);
        res.status(500).json({ 'error': err.message });
    }
}

const deleteCourse = async (req, res) => {
    const { id, courseId } = req.body;

    if (!id || !courseId) return res.status(400).json({ 'error': 'User id and course are required' });

    const client = await Client.findOne({ _id: id }).exec();

    if (!client) return res.status(404).json({ 'error': 'Client not found' });

    const courseExists = client.enrolledCourses.some((enrolled) => enrolled._id.equals(new mongoose.Types.ObjectId(courseId)));

    if (!courseExists) return res.status(409).json({ 'error': 'Course not found' });

    try {
        const result = await Client.updateOne(
            { _id: id },
            { $pull: { enrolledCourses: { _id: courseId } } }
        );
        if (result.matchedCount > 0) {
            res.json({ 'success': 'Course deleted successfully' });
        } else {
            res.json({ 'error': 'No modifications made' });
        }
    } catch (err) {
        res.status(500).json({ 'error': err.message });
    }
}

const addCertificate = async (req, res) => {

    console.log(req.body);
    console.log(req.file);
    const { id, certificateName } = req.body;

    const filePath = req.file ? req.file.path : null;

    if (!id || !certificateName || !filePath) return res.status(400).json({ 'message': 'User Id and certificate are required' });

    const client = await Client.findOne({ _id: id }).exec();

    if (!client) return res.status(404).json({ 'error': 'Client not found' });

    try {
        const result = await Client.findOneAndUpdate(
            { _id: id },
            {
                $push: {
                    'certificates': {
                        'certificateName': certificateName,
                        'certificate': filePath
                    }
                }
            },
            {
                projection: {
                    fullname: 1, email: 1, enrolledCourses: 1, certificates: 1,
                }
            }
        );
        res.json(result);
    } catch (err) {
        res.status(500).json({ 'error': err.message });
    }
}

const deleteCertificate = async (req, res) => {
    const { id, certificateId } = req.body;

    if (!id || !certificateId) return res.status(400).json({ 'error': 'User id and course are required' });

    const client = await Client.findOne({ _id: id }).exec();

    if (!client) return res.status(404).json({ 'error': 'Client not found' });

    const certificateExists = client.certificates.some((gained) => gained._id.equals(new mongoose.Types.ObjectId(certificateId)));

    if (!certificateExists) return res.status(409).json({ 'error': 'Certificate not found' });

    try {
        const result = await Client.updateOne(
            { _id: id },
            { $pull: { certificates: { _id: certificateId } } }
        );
        if (result.matchedCount > 0) {
            res.json({ 'success': 'Certificate deleted successfully' });
        } else {
            res.json({ 'error': 'Error No modifications made' });
        }
    } catch (err) {
        res.status(500).json({ 'error': err.message });
    }
}

module.exports = {
    getAllClient,
    getClient,
    getAllAdmin,
    addCourse,
    deleteCourse,
    addCertificate,
    deleteCertificate
};