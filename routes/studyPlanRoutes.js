const express = require('express');
const router = express.Router();
const studyPlanController = require('../controllers/studyPlanController');

router.get('/', studyPlanController.getAllStudyPlans);
router.get('/:id', studyPlanController.getStudyPlanById);
router.post('/', studyPlanController.createStudyPlan);
router.put('/:id', studyPlanController.updateStudyPlan);
router.delete('/:id', studyPlanController.deleteStudyPlan);

module.exports = router;