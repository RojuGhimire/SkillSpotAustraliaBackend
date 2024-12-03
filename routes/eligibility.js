const express = require('express');
const router = express.Router();
const rolesList = require('../config/rolesList');
const verifyJWT = require('../middlewares/verifyJWT');
const verifyRoles = require('../middlewares/verifyRoles');
const eligibilityController = require('../controllers/eligibilityController');

router.post('/newEligibility', eligibilityController.createNewEligibility);
router.get('/', verifyJWT, verifyRoles(rolesList.Admin, rolesList.SuperAdmin), eligibilityController.getAllEligibility);
router.get('/:id', verifyJWT, verifyRoles(rolesList.Admin, rolesList.SuperAdmin), eligibilityController.getEligibility);
router.delete('/deleteEligibility', verifyJWT, verifyRoles(rolesList.Admin, rolesList.SuperAdmin), eligibilityController.deleteEligibility);

module.exports = router;
