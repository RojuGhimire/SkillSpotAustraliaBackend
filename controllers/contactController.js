const { getMaxListeners } = require('../model/Admin');
const Contact = require('../model/Contact');

const getAllContact = async (req, res) => {
    // searching for contact message in database
    const contacts = await Contact.find();

    // if no contacts found in database
    if (!contacts) return res.status(204).json({ 'error': 'Contact Message not found' });

    // if contact message found
    res.json(contacts);
}

const createNewContact = async (req, res) => {
    // Check for contact details in request
    const { fullname, email, mobileNumber, message } = req.body;

    // if contact details not found
    if (!fullname || !email || !mobileNumber || !message) return res.status(400).json({ 'error': 'Contact details like fullname, email, mobile number and message are all required' });

    // if all details are available
    try {
        const result = await Contact.create({
            'fullname': fullname,
            'email': email,
            'mobileNumber': mobileNumber,
            'message': message
        });

        console.log(result);
        res.status(201).json({ 'success': 'New Notice Created Successfully' });
    } catch (err) {
        console.log(err);
        res.status(500).json({ 'error': err.message });
    }
}

const deleteContact = async (req, res) => {
    const { id } = req.body;

    // if no id found in req.body
    if (!id) return res.status(400).json({ 'error': 'Id required' });

    const contact = await Contact.findOne({ _id: id }).exec();

    // if contact not available in database
    if (!contact) return res.status(204).json({ 'error': 'Contact not found' });

    const result = await Contact.deleteOne({ _id: id });
    res.json(result);
}

const getContact = async (req, res) => {
    const { id } = req.params;

    // if no id found in req.body
    if (!id) return res.status(400).json({ 'error': 'Id required' });

    const contact = await Contact.findOne({ _id: id }).exec();

    // if contact not available in database
    if (!contact) return res.status(204).json({ 'error': 'Contact not found' });

    res.json(contact);
}

module.exports = {
    getAllContact,
    createNewContact,
    deleteContact,
    getContact
}

