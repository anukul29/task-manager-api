const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const auth = require('../middlewares/auth');
const taskController = require('../controllers/task.controller');
const { checkErrors } = require('../middlewares/validation');

// Protected routes
// Create Task
router.post(
  '/',
  auth,
  [ body('title').notEmpty().withMessage('Title is required') ],
  checkErrors,
  taskController.createTask
);

// Get All Tasks
router.get('/', auth, taskController.getTasks);

// Get Single Task
router.get('/:id', auth, taskController.getTaskById);

// Update Task
router.put(
  '/:id',
  auth,
  [
    body('title').optional().notEmpty().withMessage('Title cannot be empty'),
    body('status').optional().isIn(['pending', 'completed']).withMessage('Invalid status')
  ],
  checkErrors,
  taskController.updateTask
);

// Mark Task as Complete
router.patch('/:id/complete', auth, taskController.markComplete);

// Delete Task
router.delete('/:id', auth, taskController.deleteTask);

module.exports = router;
