const { body } = require('express-validator');

const volunteerApplicationValidation = [
  body('firstName')
    .trim()
    .notEmpty()
    .withMessage('First name is required'),

  body('lastName')
    .trim()
    .notEmpty()
    .withMessage('Last name is required'),

  body('email')
    .trim()
    .isEmail()
    .withMessage('Valid email is required'),

  body('phone')
    .optional({ nullable: true, checkFalsy: true })
    .isMobilePhone('any')
    .withMessage('Valid phone number is required'),

  body('age')
    .optional({ nullable: true, checkFalsy: true })
    .isInt({ min: 0 })
    .withMessage('Age must be a positive integer'),

  body('location')
    .trim()
    .notEmpty()
    .withMessage('Location is required'),

  body('motivation')
    .trim()
    .notEmpty()
    .withMessage('Motivation is required'),

  body('availability')
    .trim()
    .notEmpty()
    .withMessage('Availability is required'),

  body('experience')
    .optional({ nullable: true, checkFalsy: true })
    .trim(),
];

module.exports = volunteerApplicationValidation;
