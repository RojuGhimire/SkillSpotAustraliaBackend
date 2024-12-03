const express = require('express');
const router = express.Router();
const rolesList = require('../config/rolesList');
const verifyJWT = require('../middlewares/verifyJWT');
const verifyRoles = require('../middlewares/verifyRoles');
const applyController = require('../controllers/applyController');

router.get('/', verifyJWT, verifyRoles(rolesList.Admin, rolesList.SuperAdmin), applyController.getAllApply);
router.get('/:id', verifyJWT, verifyRoles(rolesList.Admin, rolesList.SuperAdmin), applyController.getApply);
router.post('/newEnroll', applyController.createNewApply);
router.delete('/deleteEnroll', verifyJWT, verifyRoles(rolesList.Admin, rolesList.SuperAdmin), applyController.deleteApply);

module.exports = router;
