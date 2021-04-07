const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');

// Reçois les informations saisies par l'utilisateur pour se connecter
router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
// Créer une route donnant sur une API Users
router.get('/', userCtrl.users);
// Créer une route dynamique spécifique à un objet afin de modifier des données
router.put('/', userCtrl.modifyUser);
// Créer une route dynamique spécifique à un objet afin de supprimer des données 
router.delete('/', userCtrl.deleteUser)

module.exports = router;