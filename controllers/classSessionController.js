const ClassSession = require('../models/classSession');

const getAllClassSessions = async (req, res) => {
  try {
    const classSessions = await ClassSession.find();
    res.json(classSessions);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};
 
const createClassSession = async (req, res) => {
  try { 
    const classSession = await ClassSession.create(req.body);
    res.json(classSession);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error creating Class Session' });
  }
};
 
const getClassSessionById = async (req, res) => {
  try {
    const classSession = await ClassSession.findById(req.params.id);
    if (!classSession) return res.status(404).json({ message: 'Class Session not found' });
    res.json(classSession);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

const updateClassSession = async (req, res) => {
  try {
    const classSession = await ClassSession.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(classSession);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

const deleteClassSession = async (req, res) => {
  try {
    await ClassSession.findByIdAndDelete(req.params.id);
    res.json({ message: 'Class Session deleted successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

module.exports = {
  getAllClassSessions,
  createClassSession,
  getClassSessionById,
  updateClassSession,
  deleteClassSession
}