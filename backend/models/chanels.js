const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

// Création d'un modèle de donnée pour les comptes utilisateurs
const chanelSchema = mongoose.Schema({
    chanel_name: { type: String, required: true, unique: true },
    create: { type: String, required: true },
    messages: { type: Array, required: true },
});

//Empêche d'utiliser le même nom de chaine
chanelSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Chanel', chanelSchema);