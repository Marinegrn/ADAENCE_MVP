const express = require('express');
const { body } = require('express-validator');
const {
  register,
  login,
  updateMe,
  changePassword,
  deleteMe
} = require('../controllers/authControllers');
const authenticate = require('../middleware/authenticate');

const router = express.Router();

// Validation pour inscription
const registerValidation = [
  body('email').isEmail().withMessage('Email invalide'),
  body('password').isLength({ min: 6 }).withMessage('Le mot de passe doit contenir au moins 6 caractères'),
  body('firstName').notEmpty().withMessage('Le prénom est obligatoire'),
  body('lastName').notEmpty().withMessage('Le nom est obligatoire'),
  body('role').isIn(['VISITOR', 'SENIOR', 'ADMIN']).withMessage('Rôle utilisateur invalide'),
  body('phone').optional().isMobilePhone().withMessage('Téléphone invalide'),
];

// Validation pour login
const loginValidation = [
  body('email').isEmail().withMessage('Email invalide'),
  body('password').notEmpty().withMessage('Le mot de passe est obligatoire'),
];

// Validation pour changement de mot de passe
const passwordValidation = [
  body('currentPassword').notEmpty().withMessage('Mot de passe actuel requis'),
  body('newPassword').isLength({ min: 6 }).withMessage('Le nouveau mot de passe doit contenir au moins 6 caractères'),
];

// Validation pour mise à jour du profil
const updateValidation = [
  body('firstName').optional().notEmpty(),
  body('lastName').optional().notEmpty(),
  body('phone').optional().isMobilePhone(),
];

// Routes
router.post('/register', registerValidation, register);
router.post('/login', loginValidation, login);

router.put('/me', authenticate, updateValidation, updateMe);
router.patch('/password', authenticate, passwordValidation, changePassword);
router.delete('/me', authenticate, deleteMe);

module.exports = router;

