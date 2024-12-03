const express = require('express');
const router = express.Router();
const rolesList = require('../config/rolesList');
const verifyJWT = require('../middlewares/verifyJWT');
const verifyRoles = require('../middlewares/verifyRoles');
const blogController = require('../controllers/blogController');

router.get('/:id', blogController.getBlog);
router.get('/', blogController.getAllBlogs);
router.put('/updateBlog', verifyJWT, verifyRoles(rolesList.Admin, rolesList.SuperAdmin), blogController.updateBlog);
router.delete('/deleteBlog', verifyJWT, verifyRoles(rolesList.Admin, rolesList.SuperAdmin), blogController.deleteBlog);
router.post('/newBlog', verifyJWT, verifyRoles(rolesList.Admin, rolesList.SuperAdmin), blogController.createNewBlog);

module.exports = router;