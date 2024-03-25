const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const verifyToken = require('../middleware/authMiddleware');

router.get('/', verifyToken, userController.getAllUsers);
router.get('/me', verifyToken, userController.getUserById);
router.get('/:id', verifyToken, userController.getUserById);
router.put('/:id',verifyToken,  userController.updateUser);
router.delete('/:id', verifyToken, userController.deleteUser);

module.exports = router;