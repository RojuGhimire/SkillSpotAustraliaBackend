const express = require('express');
const router = express.Router();
const rolesList = require('../config/rolesList');
const verifyJWT = require('../middlewares/verifyJWT');
const verifyRoles = require('../middlewares/verifyRoles');
const testimonialController = require('../controllers/testimonialController');

router.get('/', testimonialController.getAllTestimonial);
router.get('/:id', testimonialController.getTestimonial);
router.post('/newTestimonial', verifyJWT, verifyRoles(rolesList.Admin, rolesList.SuperAdmin), testimonialController.createNewTestimonial);
router.put('/updateTestimonial', verifyJWT, verifyRoles(rolesList.Admin, rolesList.SuperAdmin), testimonialController.updateTestimonial);
router.delete('/deleteTestimonial', verifyJWT, verifyRoles(rolesList.Admin, rolesList.SuperAdmin), testimonialController.deleteTestimonial);

module.exports = router;
