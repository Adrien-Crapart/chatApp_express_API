const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const user = new User({
                email: req.body.email,
                password: hash,
                surname: req.body.surname,
                name: req.body.name,
                role: req.body.role,
                create: req.body.create
            });
            user.save()
                .then(() => res.status(201).json({ message: 'enregistrement réussi' }))
                .catch(error => res.status(400).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));

};

exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email }) // Récupère l'email entré par l'utilisateur
        .then(user => {
            if (!user) {
                return res.status(401).json({ error: 'Utilisateur non trouvé' });
            }
            bcrypt.compare(req.body.password, user.password) //Compare le mdp utilisateur avec le mdp trouvé dans la base
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({ error: 'Mot de passe incorrect' });
                    }
                    res.status(200).json({ // Envois une réponse valide si bcrypt trouve le même mdp
                        userId: user._id,
                        surname: user.surname,
                        name: user.name,
                        role: user.role,
                        token: jwt.sign({ userId: user._id }, // Créer un token vers le frontend pour éviter de stocker les informations de connexion
                            'RANDOM_TOKEN_SECRET', { expiresIn: '24h' }
                        )
                    });
                })
                .catch(error => res.status(500).json({ error }))
        })
        .catch(error => res.status(500).json({ error }));
};

// Créer une route donnant sur une API utilisateur
exports.users = (req, res, next) => {
    User.find() // Cherche les données contenue en BDD
        .then(thing => res.status(200).json(thing))
        .catch(error => res.status(400).json({ error }));
};

// Créer une route dynamique spécifique à un objet afin de modifier des données
exports.modifyUser = (req, res, next) => {
    User.updateOne({ _id: req.body.id }, {...req.body, _id: req.body.id }) // Permet d'éviter une erreur
        .then(() => res.status(200).json({ message: 'Objet modifié' }))
        .catch(error => res.status(400));
};

// Créer une route dynamique spécifique à un objet afin de supprimer des données 
exports.deleteUser = (req, res, next) => {
    User.deleteOne({ _id: req.body.id })
        .then(() => res.status(200).json({ message: 'Objet supprimé' }))
        .catch(error => res.status(400).json({ error }));
};