const Apply = require('../model/Apply');

const getAllApply = async (req, res) => {
    const applies = await Apply.find();

    if (!applies) return res.status(204).json({ 'error': 'No applications found' });

    res.json(applies);
}

const createNewApply = async (req, res) => {
    const { fullname, email, number, education, address, experience, appliedCourse } = req.body;

    if (!fullname || !email || !number || !education || !address || !experience || !appliedCourse) return res.status(400).json({ 'error': `Applicant's fullname, email, number, education, address experience and applied course are all required` });

    try {
        const result = await Apply.create({
            'fullname': fullname,
            'email': email,
            'number': number,
            'education': education,
            'experience': experience,
            'address': address,
            'appliedCourse': appliedCourse
        });

        console.log(result);
        res.status(201).json({ 'success': 'Your application was submitted. Thank You !!!' });
    } catch (err) {
        res.status(500).json({ 'error': err.message });
    }
}

const deleteApply = async (req, res) => {
    const { id } = req.body;

    if (!id) return res.status(400).json({ 'error': 'Id requred' });

    const apply = await Apply.findOne({ _id: id }).exec();

    if (!apply) return res.status(204).json({ 'error': 'Application not found' });

    const result = await Apply.deleteOne({ _id: id });
    res.json(result);
}

const getApply = async (req, res) => {
    const { id } = req.params;

    if (!id) return res.status(400).json({ 'error': 'Id required' });

    const apply = await Apply.findOne({ _id: id });

    if (!apply) return res.status(204).json({ 'error': 'Application not found' });

    res.json(apply);
}

module.exports = {
    getAllApply,
    createNewApply,
    deleteApply,
    getApply
}