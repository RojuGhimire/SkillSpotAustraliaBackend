const Type = require('../model/Type');

const getAllTypes = async (req, res) => {
    const types = await Type.find();

    if (!types) return res.status(204).json({ 'error': 'Courses not found' });

    res.json(types);
}

const createNewType = async (req, res) => {
    const { name } = req.body;

    if (!name) return res.status(400).json({ 'error': 'Course Type name is required' });


    try {
        const result = await Type.create({
            'name': name
        });

        console.log(result);
        res.status(201).json({ 'success': 'New course type created successfully' });
    } catch (err) {
        res.status(500).json({ 'error': err.message });
    }
}

const updateType = async (req, res) => {
    const { id } = req.body;

    if (!id) return res.status(400).json({ 'error': 'Id required' });

    const type = await Type.findOne({ _id: id }).exec();

    if (!type) return res.status(204).json({ 'error': 'Course not found' });

    if (req.body?.name) type.name = req.body.name;

    const result = await type.save();
    res.json(result);
}

const deleteType = async (req, res) => {
    const { id } = req.body;

    if (!id) return res.status(400).json({ 'error': 'Id required' });

    const type = await Type.findOne({ _id: id }).exec();

    if (!type) return res.status(204).json({ 'error': 'Course not found' });

    const result = await type.deleteOne({ _id: id });
    res.json(result);
}

const getType = async (req, res) => {
    const { id } = req.params;

    if (!id) return res.status(400).json({ 'error': 'Id required' });

    const type = await Type.findOne({ _id: id }).exec();

    if (!type) return res.status(204).json({ 'error': 'Course not found' });

    res.json(type);
}

module.exports = {
    getAllTypes,
    createNewType,
    updateType,
    deleteType,
    getType
}
