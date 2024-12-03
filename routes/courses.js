const express = require('express');
const router = express.Router();
const rolesList = require('../config/rolesList');
const verifyJWT = require('../middlewares/verifyJWT');
const verifyRoles = require('../middlewares/verifyRoles');
const courseController = require('../controllers/courseController');

router.get('/', courseController.getAllCourse);
router.get('/:id', courseController.getCourse);
router.post('/newCourse', verifyJWT, verifyRoles(rolesList.Admin, rolesList.SuperAdmin), courseController.createNewCourse);
router.put('/updateCourse', verifyJWT, verifyRoles(rolesList.Admin, rolesList.SuperAdmin), courseController.updateCourse);
router.delete('/deleteCourse', verifyJWT, verifyRoles(rolesList.Admin, rolesList.SuperAdmin), courseController.deleteCourse);

module.exports = router;
