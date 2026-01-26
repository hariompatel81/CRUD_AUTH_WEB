const {body} = require("express-validator");

exports.createUserValidation = [
  body('name').notEmpty().withMessage("Name is required")
  .isLength({ min: 2 }).withMessage("Name must be at least 2 characters"),

  body('email').notEmpty().withMessage("Email is required").
  isEmail().withMessage("Invalid email format"),

  body('password').notEmpty().withMessage("Password is required").
  isLength({min:6}).withMessage("Password must be at least  6 characters"),

  body('age').optional().isInt({min:1}).withMessage("Age must be a positive number")
];

exports.loginValidation = [
  body('email').notEmpty().withMessage("Email is required").
  isEmail().withMessage("Invalid email format"),

  body('password').notEmpty().withMessage("Password is required").
  isLength({min:6}).withMessage("Password must be at least 6 characters")
];