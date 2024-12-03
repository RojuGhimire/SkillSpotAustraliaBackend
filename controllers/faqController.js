const Faq = require('../model/Faq');

const getAllFaq = async (req, res) => {
    const faqs = await Faq.find();

    if (!faqs) return res.status(204).json({ 'error': 'Faqs not found' });

    res.json(faqs);
}

const createFaq = async (req, res) => {
    const { question, answer } = req.body;

    if (!question || !answer) return res.status(400).json({ 'error': 'Question and answer are required' });

    try {
        const result = await Faq.create({
            'question': question,
            'answer': answer
        });
        console.log(result);
        res.status(201).json({ 'success': 'Faq successfully created' });
    } catch (err) {
        res.status(500).json({ 'error': err.message });
    }
}

const updateFaq = async (req, res) => {
    const { id, question, answer } = req.body;

    if (!id) return res.status(400).json({ 'error': 'Id required' });

    if (!question && !answer) return res.status(400).json({ 'error': 'Update at least one field' });

    const faq = await Faq.findOne({ _id: id }).exec();

    if (!faq) return res.status(204).json({ 'error': 'Faq not found' });

    if (question) faq.question = question;
    if (answer) faq.answer = answer;

    try {
        const result = await faq.save();
        console.log(result);
        res.status(201).json('Updated Faq Successfully');
    } catch (err) {
        res.status(500).json({ 'error': err.message });
    }
}

const deleteFaq = async (req, res) => {
    const { id } = req.body;

    if (!id) return res.status(400).json({ 'error': 'Id required' });

    const faq = await Faq.findOne({ _id: id }).exec();

    if (!faq) return res.status(204).json({ 'error': 'Faq not found' });

    try {
        const result = await Faq.deleteOne({ _id: id });
        console.log(result);
        res.status(201).json({ 'success': 'Faq deleted successfully' });
    } catch (err) {
        res.status(500).json({ 'error': err.message });
    }
}

const getFaq = async (req, res) => {
    const { id } = req.params;

    if (!id) return res.status(400).json({ 'error': 'Id required' });

    const faq = await Faq.findOne({ _id: id }).exec();

    res.json(faq);
}

module.exports = {
    getAllFaq,
    createFaq,
    updateFaq,
    deleteFaq,
    getFaq
}