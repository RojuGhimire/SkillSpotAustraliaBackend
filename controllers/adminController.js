const Admin = require('../model/Admin');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const handleAdmin = async (req, res) => {
    // Check for username and password in request body
    const { user, pass } = req.body;
    if (!user || !pass) {
        return res.status(400).json({ 'error': 'Username and Password are required' });
    }

    // Checking for duplicate values in database
    const duplicateAdmin = await Admin.findOne({ username: user }).exec();
    if (duplicateAdmin) {
        return res.status(409).json({ 'error': 'Username already exists. Use another username' });
    }

    try {
        // Encrypting Password
        const encryptedPsw = await bcrypt.hash(pass, 10);

        // Create and store Admin in database
        const result = await Admin.create({
            'username': user,
            'password': encryptedPsw
        });

        console.log(result);
        res.status(201).json({ 'success': 'New admin registered successfully' });

    } catch (err) {
        res.status(500).json({ 'error': err.message });
    }
}

const handleSadmin = async (req, res) => {
    // Checking for username and password in request body
    const { user, pass } = req.body;
    if (!user || !pass) {
        return res.status(400).json({ 'error': 'Username and Password are required' });
    }

    // Checking for duplicate values in database
    const duplicate = await Admin.findOne({ username: user }).exec();
    if (duplicate) {
        return res.status(409).json({ 'error': 'Username already exists. Use another username' });
    }

    try {
        // Encrypting password
        const encryptedPsw = await bcrypt.hash(pass, 10);

        // Create and store Superadmin in database
        const result = await Admin.create({
            'username': user,
            'password': encryptedPsw,
            'roles': {
                'SuperAdmin': 1550,
                'SpecialAccess': 1551
            }
        });

        console.log(result);
        res.status(201).json({ 'success': 'New super admin registered successfully' });

    } catch (err) {
        res.status(500).json({ 'error': err.message });
    }
}

const handleSpecialAccess = async (req, res) => {
    const { id, specialAccess } = req.body;

    if (!id) return res.status(400).json({ 'error': 'Admin id and special access value are required' });

    const admin = await Admin.findOne({ _id: id });

    if (!admin) return res.status(401).json({ 'error': 'Admin not found' });

    try {
        if (specialAccess === true) {
            const result = await Admin.findOneAndUpdate(
                { _id: id },
                {
                    $set: {
                        'roles.SpecialAccess': 1551
                    }
                },
                {
                    projection: {
                        username: 1, roles: 1
                    }
                }
            );
            return res.status(201).json(result);
        } else {
            const result = await Admin.findOneAndUpdate(
                { _id: id },
                { $unset: { 'roles.SpecialAccess': "" } },
                { new: true }
            );
            if (result) {
                res.json({ 'success': 'Special Access removed' });
            } else {
                res.json({ 'error': 'No modifications made' });
            }
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ 'error': err.message });
    }
}

const handleAdminLogin = async (req, res) => {
    const { user, pass } = req.body;
    if (!user || !pass) return res.status(400).json({ 'error': 'Username and Password are required' });

    // Check for username in database
    const foundAdmin = await Admin.findOne({ username: user });
    // If username not found
    if (!foundAdmin) return res.status(401).json({ 'error': 'Username not found' });

    // Compare password if Username found
    const match = await bcrypt.compare(pass, foundAdmin.password);
    // if password match
    if (match) {
        const roles = Object.values(foundAdmin.roles);
        const adminName = foundAdmin.username;
        const adminId = foundAdmin._id;
        // Creating access token if login successful
        const accessToken = jwt.sign(
            {
                'UserInfo': {
                    'username': foundAdmin.username,
                    'roles': roles
                }
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '5m' }
        );
        // Creating refresh token if login successful
        const refreshToken = jwt.sign(
            {
                'username': foundAdmin.username
            },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: '1d' }
        );

        // saving refresh token in database
        foundAdmin.refreshToken = refreshToken;
        const result = await foundAdmin.save();
        console.log(result);

        // Assigning refresh token as a http only cookie
        res.cookie('jwt', refreshToken, { httpOnly: true, sameSite: 'None', secure: true, maxAge: 24 * 60 * 60 * 1000 });
        res.json({ adminName, roles, accessToken, adminId });
    } else {
        // If password doesnt match
        res.status(401).json({ 'error': 'Username and Password does not match' });
    }
}

const changeAdminPass = async (req, res) => {
    const { id, currentPass, newPass } = req.body;

    if (!id) return res.status(400).json({ 'error': 'Could not verify the admin' });

    if (!currentPass || !newPass) return res.status(400).json({ 'error': 'Current password and New passowrd are required to change password' });

    const foundAdmin = await Admin.findOne({ _id: id }).exec();

    if (!foundAdmin) return res.status(401).json({ 'error': 'User not found' });

    const match = await bcrypt.compare(currentPass, foundAdmin.password);

    if (match) {
        try {
            const encryptedPsw = await bcrypt.hash(newPass, 10);

            foundAdmin.password = encryptedPsw;

            const result = await foundAdmin.save();
            res.json(result);
        } catch (err) {
            res.status(500).json({ 'error': err.message });
        }
    } else {
        res.status(204).json({ 'error': 'Current Password does not match' });
    }
}

const handleAdminLogout = async (req, res) => {
    const cookie = req.cookies;
    if (!cookie?.jwt) return res.sendStatus(204); // no refresh token to clear
    const refreshToken = cookie.jwt;

    // if found refresh token
    const foundAdmin = await Admin.findOne({ refreshToken }).exec();
    if (!foundAdmin) {
        res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
        return res.sendStatus(204);
    }

    // delete refresh token if found
    foundAdmin.refreshToken = '';
    const result = await foundAdmin.save();
    console.log(result);

    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
    return res.sendStatus(204);
}

const handleAdminRefreshToken = async (req, res) => {
    // Check for cookie
    const cookie = req.cookies;
    if (!cookie?.jwt) return res.sendStatus(401);
    const refreshToken = cookie.jwt;

    // Check for refresh token in database
    const foundAdmin = await Admin.findOne({ refreshToken }).exec();
    if (!foundAdmin) return res.sendStatus(401);

    // If found
    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded) => {
            if (err || foundAdmin.username !== decoded.username) return res.sendStatus(403);
            const roles = Object.values(foundAdmin.roles);
            const adminName = foundAdmin.username;
            const accessToken = jwt.sign(
                {
                    "UserInfo": {
                        "username": foundAdmin.username,
                        "roles": roles
                    }
                },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '30s' }
            );
            res.json({ adminName, roles, accessToken });
        }
    )
}

module.exports = {
    handleAdmin,
    handleSadmin,
    handleSpecialAccess,
    handleAdminLogin,
    changeAdminPass,
    handleAdminLogout,
    handleAdminRefreshToken
}