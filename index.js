// index.js (entry point)
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const router = express.Router();

dotenv.config();

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Database connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// Routes
router.get('/', ()=> {
  return 'Welcome to Routine Planner API'
});
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
// const studyPlanRoutes = require('./routes/studyPlanRoutes');


app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
// app.use('/api/study-plans', studyPlanRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));