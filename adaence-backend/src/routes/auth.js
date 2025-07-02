const express = require('express');
const { body } = require('express-validator');
const { register, login } = require('../controllers/authControllers');

const router = express.Router();

// Validation des inputs pour inscription
const registerValidation = [
  body('email').isEmail().withMessage('Email invalide'),
  body('password').isLength({ min: 6 }).withMessage('Le mot de passe doit contenir au moins 6 caractères'),
  body('nom').notEmpty().withMessage('Le nom est obligatoire'),
  body('prenom').notEmpty().withMessage('Le prénom est obligatoire'),
  body('typeUser').isIn(['AINE', 'BENEVOLE']).withMessage('Type utilisateur invalide'),
  // tu peux ajouter d’autres validations si besoin (age, ville, téléphone...)
];

// Validation des inputs pour connexion
const loginValidation = [
  body('email').isEmail().withMessage('Email invalide'),
  body('password').notEmpty().withMessage('Le mot de passe est obligatoire'),
];

// Routes
router.post('/register', registerValidation, register);
router.post('/login', loginValidation, login);

module.exports = router;
