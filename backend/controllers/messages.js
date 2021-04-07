// Appelle les modèles de formatage des données
const Message = require('../models/messages');
const Chanel = require('../models/chanels');

////////////// Controlleurs pour les messages //////////////////

exports.createMessage = (req, res, next) => {
    const thing = new Message({
        ...req.body
    });
    // Trouve l'array messages et insert le nouveau message
    Chanel.findByIdAndUpdate(req.body._id, { $push: { "messages": thing } }, { safe: true, upsert: true, new: true },
        function(err, result) {
            if (err) {
                res.status(400).json({ err });
            } else {
                res.status(201).json({ message: 'Message ajouté' })
            };
        })
};

////////////// Controlleurs pour les chaines //////////////////

exports.createChanel = (req, res, next) => {
    delete req.body._id;
    const thing = new Chanel({
        ...req.body
    });
    thing.save() // Permet l'enregistrement dans la BDD
        .then(() => res.status(201).json({ message: 'Chaine créée' }))
        .catch(error => res.status(400).json({ error }));
};

// Créer une route donnant sur une API utilisateur
exports.Chanel = (req, res, next) => {
    Chanel.find() // Cherche les données contenue en BDD
        .then(thing => res.status(200).json(thing))
        .catch(error => res.status(400).json({ error }));
};

// Créer une route dynamique spécifique à un objet afin de modifier des données
exports.modifyChanel = (req, res, next) => {
    Chanel.updateOne({ _id: req.body.id }, {...req.body, _id: req.body.id }) // Permet d'éviter une erreur
        .then(() => res.status(200).json({ message: 'Chaine modifiée' }))
        .catch(error => res.status(400));
};

// Créer une route dynamique spécifique à un objet afin de supprimer des données 
exports.deleteChanel = (req, res, next) => {
    Chanel.deleteOne({ _id: req.body.id })
        .then(() => res.status(200).json({ message: 'Chaine supprimée' }))
        .catch(error => res.status(400).json({ error }));
};