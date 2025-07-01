// const express = require('express');
// const { body } = require('express-validator');
// const { register, login } = require('../controllers/authController');

// const router = express.Router();

// // Validation pour l'inscription
// const registerValidation = [
//   body('email').isEmail().withMessage('Email invalide'),
//   body('password').isLength({ min: 6 }).withMessage('Le mot de passe doit contenir au moins 6 caractères'),
//   body('nom').notEmpty().withMessage('Le nom est requis'),
//   body('prenom').notEmpty().withMessage('Le prénom est requis'),
//   body('typeUser').isIn(['AINE', 'BENEVOLE']).withMessage('Type d\'utilisateur invalide')
// ];

// // Validation pour la connexion
// const loginValidation = [
//   body('email').isEmail().withMessage('Email invalide'),
//   body('password').notEmpty().withMessage('Mot de passe requis')
// ];

// // Routes
// router.post('/register', registerValidation, register);
// router.post('/login', loginValidation, login);

// module.exports = router;