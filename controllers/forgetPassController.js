const forgetPassMail = require('../helper/forgetPassMail');
const ForgetPass = require('../model/ForgetPass');
const Client = require('../model/Client');
const bcrypt = require('bcrypt');

const getAllResetPassReq = async (req, res) => {
    const forgetPassReqs = await ForgetPass.find();

    if (!forgetPassReqs) return res.status(204).json({ 'error': 'No forget pass request found' });

    res.json(forgetPassReqs);
}

const resetPassReq = async (req, res) => {
    const { email } = req.body;

    if (!email) return res.status(400).json({ 'error': 'Email is required' });

    const client = await Client.findOne({ email: email });

    if (!client) return res.status(204).json({ 'error': 'Client not found' });

    try {
        const result = await ForgetPass.create({
            'email': email
        });
        res.json(result);
    } catch (err) {
        res.status(500).json({ 'error': err.message });
    }

    res.status(201).json({ 'success': 'Password Reset Request Sent' });
}

const resetPass = async (req, res) => {
    const { email, pass } = req.body;

    if (!email || !pass) return res.status(400).json({ 'error': 'Email and password are required' });

    const client = await Client.findOne({ email: email }).exec();

    if (!client) return res.status(204).json({ 'error': 'Client not found' });

    try {
        const encryptedPass = await bcrypt.hash(pass, 10);
        client.password = encryptedPass;
        await client.save();
        forgetPassMail(email, pass);
        await ForgetPass.deleteOne({ email: email });
        res.json({ 'success': 'Password reset successful' });
    } catch (err) {
        res.status(500).json({ 'error': err.message });
    }
}

const deleteResetPassReq = async (req, res) => {
    const { email } = req.body;

    if (!email) return res.status(400).json({ 'error': 'Email required' });

    const forgotPassReq = ForgetPass.findOne({ email: email }).exec();

    if (!forgotPassReq) return res.status(204).json({ 'error': 'Forgot Password Request not found' });

    try {
        await ForgetPass.deleteOne({ email: email });
        res.json({ 'success': 'Password Reset Request deleted successfully' });
    } catch (err) {
        res.status(500).json({ 'error': err.message });
    }
}

module.exports = {
    getAllResetPassReq,
    resetPassReq,
    resetPass,
    deleteResetPassReq
}
