const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const path = require('path');
const morgan = require("morgan");
var cors = require('cors');

// Appelle les routes nécessaires aux méthodes CRUD du serveur
const messagesRoutes = require('./routes/messages');
const userRoutes = require('./routes/user');

// Permet de filtrer les adresses utilisateurs
app.use(cors({
    origin: function(origin, callback) {
        return callback(null, true);
    },
    optionsSuccessStatus: 200,
    credentials: true
}));
// Permet de gérer les droits utilisateurs
app.use((req, res, next) => {
    //res.setHeader('Access-Control-Allow-Origin', '*'); 
    //res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

// Se connecte à la BDD MongoDB
mongoose.Promise = require('bluebird');
mongoose.connect('mongodb+srv://data:data06@cluster0.vtex6.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        promiseLibrary: require('bluebird')
    })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));

// Configure les packages de session utilisateur
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
// Configure le package morgan pour récupérer les requetes utilisateurs
app.use(morgan("dev"));

// Importe les routes définient dans messages.js
app.use('/api/chanels', messagesRoutes);
// Importe les routes définient dans auth.js
app.use('/api/auth', userRoutes);

module.exports = app;