const express = require('express');
const router = express.Router();
const forgetPassController = require('../controllers/forgetPassController');
const rolesList = require('../config/rolesList');
const verifyJWT = require('../middlewares/verifyJWT');
const verifyRoles = require('../middlewares/verifyRoles');

router.post('/resetReq', forgetPassController.resetPassReq);
router.get('/', verifyJWT, verifyRoles(rolesList.SuperAdmin), forgetPassController.getAllResetPassReq);
router.put('/resetPass', verifyJWT, verifyRoles(rolesList.SuperAdmin), forgetPassController.resetPass);
router.delete('/deleteReq', verifyJWT, verifyRoles(rolesList.SuperAdmin), forgetPassController.deleteResetPassReq);

module.exports = router;