const Referal = require('../model/Referal');

const getAllRefers = async (req, res) => {
    const refers = await Referal.find();

    if (!refers) return res.status(204).json({ 'error': 'Eligibilties not found' });

    res.json(refers);
}

const createNewRefers = async (req, res) => {
    const { refferalName, refferalEmail, refferalNumber, reffererName, reffererEmail, reffererNumber } = req.body;

    if (!refferalName || !refferalEmail || !refferalNumber || !reffererName || !reffererEmail || !reffererNumber) return res.json({ 'error': `Referer's and Referals name email and number are required` });

    try {
        const result = await Referal.create({
            'refferalName': refferalName,
            'refferalEmail': refferalEmail,
            'refferalNumber': refferalNumber,
            'reffererName': reffererName,
            'reffererEmail': reffererEmail,
            'reffererNumber': reffererNumber
        });

        console.log(result);
        res.status(201).json({ 'success': 'Referal added successfully. Thank you' });
    } catch (err) {
        console.log(err);
        res.status(500).json({ 'error': err.message });
    }
}

const deleteRefers = async (req, res) => {
    const { id } = req.body;

    if (!id) return res.status(400).json({ 'error': 'Id required' });

    const refer = await Referal.findOne({ _id: id }).exec();

    if (!refer) return res.status(204).json({ 'error': 'Refer not found' });

    const result = await Referal.deleteOne({ _id: id });
    res.json(result);
}

const getRefer = async (req, res) => {
    const { id } = req.params;

    if (!id) return res.status(400).json({ 'error': 'Id required' });

    const refer = await Referal.findOne({ _id: id }).exec();

    if (!refer) return res.status(204).json({ 'error': 'Refer not found' });

    res.json(refer);
}

module.exports = {
    getAllRefers,
    createNewRefers,
    deleteRefers,
    getRefer
}