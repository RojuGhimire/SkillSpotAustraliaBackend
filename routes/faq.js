const express = require('express');
const router = express.Router();
const faqController = require('../controllers/faqController');
const rolesList = require('../config/rolesList');
const verifyRoles = require('../middlewares/verifyRoles');
const verifyJWT = require('../middlewares/verifyJWT');

router.get('/', faqController.getAllFaq);
router.post('/newFaq', verifyJWT, verifyRoles(rolesList.Admin, rolesList.SuperAdmin), faqController.createFaq);
router.put('/updateFaq', verifyJWT, verifyRoles(rolesList.Admin, rolesList.SuperAdmin), faqController.updateFaq);
router.delete('/deleteFaq', verifyJWT, verifyRoles(rolesList.Admin, rolesList.SuperAdmin), faqController.deleteFaq);
router.get('/:id', faqController.getFaq);

module.exports = router;
