const express = require('express');
const router = express.Router();
const rolesList = require('../config/rolesList');
const verifyRoles = require('../middlewares/verifyRoles');
const verifyJWT = require('../middlewares/verifyJWT');
const referalController = require('../controllers/referalController');

router.get('/', verifyJWT, verifyRoles(rolesList.Admin, rolesList.Client), referalController.getAllRefers);
router.post('/newRefer', referalController.createNewRefers);
router.delete('/deleteRefer', verifyJWT, verifyRoles(rolesList.Admin, rolesList.SuperAdmin), referalController.deleteRefers);
router.get('/:id', verifyJWT, verifyRoles(rolesList.Admin, rolesList.SuperAdmin), referalController.getRefer);

module.exports = router;
