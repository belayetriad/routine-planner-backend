const StudyPlan = require('../models/studyPlan');
const generateSchedule = require('../utils/generateSchedule');
const { validationResult } = require('express-validator');
const ClassSession = require('../models/classSession');
// **Create** a study plan
exports.createStudyPlan = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  } 

  const { classes, availableTime, date } = req.body;  
  const classList = await ClassSession.find({ _id: { $in: classes } }).exec(); 
  try {
    const schedule = generateSchedule( classList, availableTime, date);
    const plans = await StudyPlan.create(schedule.map(s => ({
      user: req.userId,
      ...s
    }))); 
    res.json(plans);
  } catch (err) {  
    res.status(500).json({ message: 'Error creating study plan' });
  }
};

// **Read** all study plans for a user
exports.getStudyPlans = async (req, res) => {
  try {
    const dateString = req.query['date'];
    const date = dateString ? new Date(dateString) : null;
    
     

    const query = { user: req.userId };
    if (date) {
      // Set the start of the day
      const startOfDay = new Date(date);
      startOfDay.setHours(0, 0, 0, 0);

      // Set the end of the day
      const endOfDay = new Date(date);
      endOfDay.setHours(23, 59, 59, 999);

      // Include both start and end of the day in the query
      query.date = { $gte: startOfDay, $lte: endOfDay };
    }

    const plans = await StudyPlan.find(query).populate('classSession').populate('user');
    res.json(plans);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error retrieving study plans' });
  }
};

// **Read** a specific study plan by ID
exports.getStudyPlanById = async (req, res) => {
  const planId = req.params.id;

  try {
    const plan = await StudyPlan.findById(planId);
    if (!plan) {
      return res.status(404).json({ message: 'Study plan not found' });
    }
    res.json(plan);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error retrieving study plan' });
  }
};

// **Update** a study plan
exports.updateStudyPlan = async (req, res) => {
  const planId = req.params.id;
  const updates = req.body;

  // Implement validation for update data (e.g., availableTime)

  try {
    const plan = await StudyPlan.findByIdAndUpdate(planId, updates, { new: true });
    if (!plan) {
      return res.status(404).json({ message: 'Study plan not found' });
    }
    res.json(plan);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error updating study plan' });
  }
};

// **Delete** a study plan
exports.deleteStudyPlan = async (req, res) => {
  const planId = req.params.id;

  try {
    const plan = await StudyPlan.findByIdAndDelete(planId);
    if (!plan) {
      return res.status(404).json({ message: 'Study plan not found' });
    }
    res.json({ message: 'Study plan deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error deleting study plan' });
  }
};