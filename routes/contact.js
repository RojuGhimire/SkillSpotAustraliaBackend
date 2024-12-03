const express = require('express');
const router = express.Router();
const rolesList = require('../config/rolesList');
const verifyJWT = require('../middlewares/verifyJWT');
const verifyRoles = require('../middlewares/verifyRoles');
const contactController = require('../controllers/contactController');

router.post('/newMsg', contactController.createNewContact);
router.get('/:id', verifyJWT, verifyRoles(rolesList.Admin, rolesList.SuperAdmin), contactController.getContact);
router.get('/', verifyJWT, verifyRoles(rolesList.Admin, rolesList.SuperAdmin), contactController.getAllContact);
router.delete('/deleteMsg', verifyJWT, verifyRoles(rolesList.Admin, rolesList.SuperAdmin), contactController.deleteContact);

module.exports = router;