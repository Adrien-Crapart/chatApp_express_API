const multer = require('multer');

// Configure une dictionnaire de format d'image 
const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png'
};

const storage = multer.diskStorage({
    destination: (req, res, callback) => {
        callback(null, 'images')
    },
    filename: (req, file, callback) => {
        const name = file.originalname.split(' ').join('_'); // Enlève le problèmes des espaces
        const extension = MIME_TYPES[file.mimetype]; // Détecte le format de fichier
        callback(null, name + Date.now() + '.' + extension)
    }
});

module.exports = multer({ storage }).single('image'); // Génère une nom de fichier unique en l'exportant