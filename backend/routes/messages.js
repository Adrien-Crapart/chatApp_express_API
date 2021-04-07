const express = require('express');
const router = express.Router();
const stuffCtrl = require('../controllers/messages');
// Protège les routes par un token
//const auth = require('../middleware/auth');


////////////// Routes pour les messages //////////////////

// Transforme les requêtes post en donnée exploitable pour les stocker
router.post('/messages', stuffCtrl.createMessage); //multer,

////////////// Routes pour les chaines //////////////////

// Créer une route donnant sur l'API des chaines
router.get('/', stuffCtrl.Chanel);

// Créer une route pour ajouter des chaines
router.post('/', stuffCtrl.createChanel);

// Créer une route dynamique spécifique à un objet afin de modifier des données
router.put('/', stuffCtrl.modifyChanel);

// Créer une route dynamique spécifique à un objet afin de supprimer des données 
router.delete('/', stuffCtrl.deleteChanel)

module.exports = router;