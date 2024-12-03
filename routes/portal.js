const express = require('express');
const router = express.Router();
const portalController = require('../controllers/portalController');
const rolesList = require('../config/rolesList');
const verifyJWT = require('../middlewares/verifyJWT');
const verifyRoles = require('../middlewares/verifyRoles');
const upload = require('../middlewares/multer');

router.get('/clients', verifyJWT, verifyRoles(rolesList.SuperAdmin, rolesList.SpecialAccess), portalController.getAllClient);
router.get('/clients/:id', verifyJWT, verifyRoles(rolesList.SuperAdmin, rolesList.SpecialAccess, rolesList.Client), portalController.getClient);
router.get('/admins', verifyJWT, verifyRoles(rolesList.SuperAdmin, rolesList.SpecialAccess), portalController.getAllAdmin);
router.post('/addCourse', verifyJWT, verifyRoles(rolesList.SuperAdmin, rolesList.SpecialAccess), portalController.addCourse);
router.delete('/deleteCourse', verifyJWT, verifyRoles(rolesList.SuperAdmin, rolesList.SpecialAccess), portalController.deleteCourse);
router.post('/addCertificate', verifyJWT, verifyRoles(rolesList.SuperAdmin, rolesList.SpecialAccess), upload.single('file'), portalController.addCertificate);
router.delete('/deleteCertificate', verifyJWT, verifyRoles(rolesList.SuperAdmin, rolesList.SpecialAccess), portalController.deleteCertificate);

module.exports = router;