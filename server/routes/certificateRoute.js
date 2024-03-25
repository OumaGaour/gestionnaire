const express = require("express");
const router = express.Router();

// Importer la fonction de génération de certificat depuis le contrôleur
const { generateCertificate } = require("../controller/certificateController");

// Route pour la génération de certificat
router.post("/generate", async (req, res) => {
  try {
    const { candidateName, courseName, orgName, assignDate, duration, emailId } = req.body;

    // Appeler la fonction de génération de certificat avec les données du candidat
    const certificateData = await generateCertificate({
      candidateName,
      courseName,
      orgName,
      assignDate,
      duration,
      emailId
    });

    // Envoyer les données du certificat en réponse
    res.json(certificateData);
  } catch (error) {
    console.error("Error generating certificate:", error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
