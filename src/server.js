const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const userRoutes = require('./routes/user.routes');
const taskRoutes = require('./routes/task.routes');
const { validationResult } = require('express-validator');

dotenv.config();
const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(morgan('dev'));
app.use(express.json());

// Custom middleware to handle validation errors from express-validator
app.use((req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
});

// Routes
app.use('/api/users', userRoutes);  // /api/users/register, /api/users/login
app.use('/api/tasks', taskRoutes);  // /api/tasks, /api/tasks/:id, etc.


// Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
