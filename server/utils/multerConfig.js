const multer = require('multer');

// Configurer Multer pour la gestion des fichiers
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/') // Répertoire où les fichiers seront stockés
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname) // Nom de fichier unique
  }
});

const upload = multer({ storage: storage });

module.exports = upload;
