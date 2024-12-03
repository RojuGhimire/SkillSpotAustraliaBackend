const Notice = require('../model/Notice');

const getAllNotice = async (req, res) => {
    // look for notice in database
    const notices = await Notice.find();

    // If no notice found
    if (!notices) return res.status(204).json({ 'error': 'Notices not found' });

    // If notices found
    res.json(notices);
}

const createNewNotice = async (req, res) => {
    // Check for notice details in request
    const { title, description } = req.body;

    if (!title || !description) return res.status(400).json({ 'error': 'Notice title and description are all required' });

    // if all details are available
    try {

        // Creating new blog date
        const currentDate = new Date();
        const formattedDate = currentDate.toLocaleDateString('en-US', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
        });

        const result = await Notice.create({
            'title': title,
            'description': description,
            'date': formattedDate
        });

        console.log(result);
        res.status(201).json({ 'success': 'New Notice Created Successfully' });
    } catch (err) {
        console.log(err);
        res.status(500).json({ 'error': err.message });
    }
}

const updateNotice = async (req, res) => {
    // Searching specific notice in database
    const { id } = req.body;

    // If no id found in req.body
    if (!id) return res.status(400).json({ 'error': 'Id required' });

    const notice = await Notice.findOne({ _id: id }).exec();

    // If notice is not available in database
    if (!notice) return res.status(204).json({ 'error': 'Blog not found' });

    // If blog found
    if (req.body?.title) notice.title = req.body.title;
    if (req.body?.description) notice.description = req.body.description;

    const result = await notice.save();
    res.json(result);
}

const deleteNotice = async (req, res) => {
    const { id } = req.body;

    // If no id found in req.body
    if (!id) return res.status(400).json({ 'error': 'Id required' });

    const notice = await Notice.findOne({ _id: id }).exec();

    // if notice is not available in database
    if (!notice) return res.status(204).json({ 'error': 'Notice not found' });

    const result = await Notice.deleteOne({ _id: id });
    res.json(result);
}

const getNotice = async (req, res) => {
    const { id } = req.params;

    // If no id found in params
    if (!id) return res.status(400).json({ 'error': 'Id required' });

    const notice = await Notice.findOne({ _id: id }).exec();

    // If no notice found
    if (!notice) return res.status(204).json({ 'error': 'Notice not found' });

    res.json(notice);
}

module.exports = {
    getAllNotice,
    createNewNotice,
    updateNotice,
    deleteNotice,
    getNotice
}