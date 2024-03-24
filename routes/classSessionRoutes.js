const express = require('express');
const router = express.Router();
const classSessionController = require('../controllers/classSessionController');
const verifyToken = require('../middleware/authMiddleware');

router.get('/', verifyToken, classSessionController.getAllClassSessions);
router.post('/', verifyToken, classSessionController.createClassSession); 
router.get('/:id', verifyToken, classSessionController.getClassSessionById);
router.put('/:id', verifyToken, classSessionController.updateClassSession);
router.delete('/:id', verifyToken, classSessionController.deleteClassSession);

module.exports = router;