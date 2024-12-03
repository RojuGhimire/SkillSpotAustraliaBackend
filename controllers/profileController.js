const Client = require('../model/Client');

const updateClientProfile = async (req, res) => {
    const { id } = req.body;

    if (!id) return res.status(400).josn({ 'error': 'Id required' });

    const client = await Client.findOne({ _id: id }).exec();

    if (!client) return res.status(204).json({ 'error': 'Client not found' });

    if (req.body?.fullname) client.fullname = req.body.fullname;
    if (req.body?.number) client.number = req.body.number;
    if (req.body?.city) client.city = req.body.city;
    if (req.body?.country) client.country = req.body.country;
    if (req.body?.gender) client.gender = req.body.gender;

    const result = await client.save();
    res.json(result);
}

const getProfileDetails = async (req, res) => {
    const { id } = req.params;

    if (!id) return res.status(400).json({ 'error': 'Id required' });

    const client = await Client.findOne({ _id: id }, { fullname: 1, email: 1, number: 1, city: 1, country: 1, gender: 1 }).exec();

    if (!client) return res.status(204).json({ 'error': 'Client not found' });

    res.json(client);
}

module.exports = { updateClientProfile, getProfileDetails };