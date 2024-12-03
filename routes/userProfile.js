const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController');
const rolesList = require('../config/rolesList');
const verifyRoles = require('../middlewares/verifyRoles');
const verifyJWT = require('../middlewares/verifyJWT');

router.put('/updateProfile', verifyJWT, verifyRoles(rolesList.Client), profileController.updateClientProfile);
router.get('/:id', verifyJWT, verifyRoles(rolesList.Client), profileController.getProfileDetails);

module.exports = router;