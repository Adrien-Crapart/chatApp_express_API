const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

// Création d'un modèle de donnée pour les comptes utilisateurs
const userSchema = mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    surname: { type: String, required: true },
    name: { type: String, required: true },
    role: { type: String, required: true },
    create: { type: String, required: true },
});

//Empêche de s'inscrire plusieurs fois avec la même adresse mail
userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);