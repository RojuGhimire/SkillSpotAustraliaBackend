const express = require('express');
const router = express.Router();
const TypeController = require('../controllers/TypeController');

router.get('/', TypeController.getAllTypes);
router.post('/newType', TypeController.createNewType);
router.put('/updateType', TypeController.updateType);
router.delete('/deleteType', TypeController.deleteType);
router.get('/:id', TypeController.getType);

module.exports = router;