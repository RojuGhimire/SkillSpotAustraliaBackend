const express = require('express');
const router = express.Router();
const clientController = require('../controllers/clientController');
const rolesList = require('../config/rolesList');
const verifyJWT = require('../middlewares/verifyJWT');
const verifyRoles = require('../middlewares/verifyRoles');

router.post('/register', verifyJWT, verifyRoles(rolesList.SuperAdmin, rolesList.SpecialAccess), clientController.handleClient);
router.post('/login', clientController.handleClientLogin);
router.get('/refresh', clientController.handleClientRefreshToken);
router.post('/changePass', verifyJWT, verifyRoles(rolesList.Client), clientController.changeClientPass);
router.get('/logout', clientController.handleClientLogout);

module.exports = router;
