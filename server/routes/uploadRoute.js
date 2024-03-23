const express = require("express");
const router = express.Router();
const upload = require('../utils/multerConfig');
const mongoose = require("mongoose");
const File = require("../models/File");

// Route pour gérer l'upload de fichiers
router.post("/upload", upload.array('files'), async (req, res) => {
  try {
    // Récupérer les fichiers téléchargés
    const files = req.files;

    if (!files) {
      return res.status(400).send('Aucun fichier n\'a été téléchargé.');
    }

    // Enregistrer les fichiers dans la base de données
    const savedFiles = await Promise.all(files.map(async (file) => {
      const newFile = new File({
        filename: file.filename,
        path: file.path,
        mimetype: file.mimetype,
        size: file.size
      });
      return await newFile.save();
    }));

    res.send(savedFiles);
  } catch (error) {
    console.error('Erreur lors de l\'enregistrement des fichiers :', error);
    res.status(500).send('Une erreur est survenue lors de l\'enregistrement des fichiers.');
  }
});

module.exports = router;
