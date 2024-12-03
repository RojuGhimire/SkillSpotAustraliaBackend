const Client = require('../model/Client');
const bcrypt = require('bcrypt');
const generateMail = require('../helper/generateMail');
const jwt = require('jsonwebtoken');

const handleClient = async (req, res) => {
    // Checking for email and password in request body
    const { email, pass } = req.body;
    if (!email || !pass) {
        return res.status(400).json({ 'error': 'Email and Password are required' });
    }

    // Checking for duplicate values in database
    const duplicateEmail = await Client.findOne({ email: email }).exec();
    if (duplicateEmail) {
        return res.status(409).json({ 'error': 'Email already exist. Use another email' });
    }

    try {
        // Encrypting Password
        const encryptedPsw = await bcrypt.hash(pass, 10);

        // Create and store Client in database
        const result = await Client.create({
            'email': email,
            'password': encryptedPsw,
        });
        generateMail(email, pass);
        console.log(result);
        res.status(201).json({ 'success': 'New client registered successfully' });

    } catch (err) {
        res.status(500).json({ 'error': err.message });
    }
}

const handleClientLogin = async (req, res) => {
    const { email, pass } = req.body;
    if (!email || !pass) return res.status(400).json({ 'error': 'Email and Password are required' });

    // Check for email in database
    const foundClient = await Client.findOne({ email: email });
    // unauthorize if user not found
    if (!foundClient) return res.status(401).json({ 'error': 'User not found' });

    // Compare password if User Found
    const match = await bcrypt.compare(pass, foundClient.password);
    // If the password is correct
    if (match) {
        const roles = Object.values(foundClient.roles);
        const userEmail = foundClient.email;
        const userId = foundClient._id;
        // Creating access token if login successful
        const accessToken = jwt.sign(
            {
                'UserInfo': {
                    'email': foundClient.email,
                    'roles': roles
                }
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '5m' }
        );
        // Creating refresh token if login successful
        const refreshToken = jwt.sign(
            {
                'email': foundClient.email
            },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: '1d' }
        );
        // Saving refreh troken in database
        foundClient.refreshToken = refreshToken;
        const result = await foundClient.save();
        console.log(result);

        // Assigning refresh token as http only cookie
        res.cookie('jwt', refreshToken, { httpOnly: true, sameSite: 'None', secure: true, maxAge: 24 * 60 * 60 * 1000 });
        res.json({ userEmail, accessToken, roles, userId });
    } else {
        // if password doesnt match
        res.status(401).json({ 'error': 'Username and Password does not match' });
    }
}

const changeClientPass = async (req, res) => {
    const { id, currentPass, newPass } = req.body;

    if (!id) return res.status(400).json({ 'error': 'Could not verify the user' });

    if (!currentPass || !newPass) return res.status(400).json({ 'error': 'Current password and New passowrd are required to change password' });

    const foundClient = await Client.findOne({ _id: id }).exec();

    if (!foundClient) return res.status(401).json({ 'error': 'User not found' });

    const match = await bcrypt.compare(currentPass, foundClient.password);

    if (match) {
        try {
            const encryptedPsw = await bcrypt.hash(newPass, 10);

            foundClient.password = encryptedPsw;

            const result = await foundClient.save();
            res.json(result);
        } catch (err) {
            res.status(500).json({ 'error': err.message });
        }
    } else {
        res.status(204).json({ 'error': 'Current Password does not match' });
    }
}

const handleClientLogout = async (req, res) => {
    const cookie = req.cookies;
    if (!cookie?.jwt) return res.sendStatus(204); // no refresh token to clear
    const refreshToken = cookie.jwt;

    // If found refresh token
    const foundClient = await Client.findOne({ refreshToken }).exec();
    if (!foundClient) {
        res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
        return res.sendStatus(204);
    }

    // Delete refresh token if found
    foundClient.refreshToken = '';
    const result = await foundClient.save();
    console.log(result);

    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
    res.sendStatus(204);
}

const handleClientRefreshToken = async (req, res) => {
    // Check for cookie
    const cookie = req.cookies;
    if (!cookie?.jwt) return res.sendStatus(401);
    const refreshToken = cookie.jwt;

    // Check for the refresh token in database
    const foundClient = await Client.findOne({ refreshToken }).exec();
    if (!foundClient) return res.sendStatus(401);

    // If found
    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded) => {
            if (err || foundClient.email !== decoded.email) return res.sendStatus(403);
            const roles = Object.values(foundClient.roles);
            const fullName = foundClient.fullname;
            const userEmail = foundClient.email;
            const userId = foundClient._id;
            const accessToken = jwt.sign(
                {
                    "UserInfo": {
                        "email": foundClient.email,
                        "roles": roles
                    }
                },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '30s' }
            );
            res.json({ accessToken, roles, userEmail, userId });
        }
    );
}

module.exports = {
    handleClient,
    handleClientLogin,
    changeClientPass,
    handleClientLogout,
    handleClientRefreshToken
}