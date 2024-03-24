const express = require('express');
const router = express.Router();
const studyPlanController = require('../controllers/studyPlanController');
const verifyToken = require('../middleware/authMiddleware');

router.get('/', verifyToken, studyPlanController.getStudyPlans);
router.get('/:id', verifyToken, studyPlanController.getStudyPlanById);
router.post('/', verifyToken, studyPlanController.createStudyPlan);
router.put('/:id', verifyToken, studyPlanController.updateStudyPlan);
router.delete('/:id', verifyToken, studyPlanController.deleteStudyPlan);

module.exports = router;