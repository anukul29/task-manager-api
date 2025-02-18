const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const userController = require('../controllers/user.controller');
const { checkErrors } = require('../middlewares/validation');
// Register

router.post(
  '/register',
  [
    body('username').notEmpty().withMessage('Username is required'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
  ], checkErrors,
  userController.registerUser
);

// Login
router.post(
  '/login',
  [
    body('username').notEmpty().withMessage('Username is required'),
    body('password').notEmpty().withMessage('Password is required')
  ], checkErrors,
  userController.loginUser
);

module.exports = router;
