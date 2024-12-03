const express = require('express');
const router = express.Router();
const rolesList = require('../config/rolesList');
const verifyJWT = require('../middlewares/verifyJWT');
const verifyRoles = require('../middlewares/verifyRoles');
const noticeController = require('../controllers/noticeController');

router.get('/', noticeController.getAllNotice);
router.get('/:id', noticeController.getNotice);
router.post('/newNotice', verifyJWT, verifyRoles(rolesList.Admin, rolesList.SuperAdmin), noticeController.createNewNotice);
router.put('/updateNotice', verifyJWT, verifyRoles(rolesList.Admin, rolesList.SuperAdmin), noticeController.updateNotice);
router.delete('/deleteNotice', verifyJWT, verifyRoles(rolesList.Admin, rolesList.SuperAdmin), noticeController.deleteNotice);

module.exports = router;
