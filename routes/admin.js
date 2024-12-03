const express = require('express');
const router = express.Router();
const rolesList = require('../config/rolesList');
const verifyJWT = require('../middlewares/verifyJWT');
const verifyRoles = require('../middlewares/verifyRoles');
const adminController = require('../controllers/adminController');

router.post('/register', verifyJWT, verifyRoles(rolesList.SuperAdmin, rolesList.SpecialAccess), adminController.handleAdmin);
router.post('/register/sadmin', verifyJWT, verifyRoles(rolesList.SuperAdmin), adminController.handleSadmin);
router.post('/login', adminController.handleAdminLogin);
router.get('/refresh', adminController.handleAdminRefreshToken);
router.post('/specialAccess', verifyJWT, verifyRoles(rolesList.SuperAdmin), adminController.handleSpecialAccess);
router.post('/changeAdminPass', verifyJWT, verifyRoles(rolesList.SuperAdmin), adminController.changeAdminPass);
router.get('/logout', adminController.handleAdminLogout);


module.exports = router;
