const mongoose = require('mongoose');

// Création d'un modèle de donnée pour l'enregistrement dans la BDD
const thingSchema = mongoose.Schema({
    username: { type: String, required: true },
    message: { type: String, required: true },
    time: { type: String, required: true },
    day: { type: String, required: true },
    avatar: { type: String, required: true },
    divider: { type: Boolean, required: true },
    inset: { type: Boolean, required: true }
});

module.exports = mongoose.model('Thing', thingSchema);