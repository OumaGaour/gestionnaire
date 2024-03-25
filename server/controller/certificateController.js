const Certificate = require("../models/Certificate"); // Assurez-vous d'importer le modèle de certificat approprié

// Fonction pour générer un certificat
exports.generateCertificate = async (req, res) => {
  try {
    const { candidateName, courseName, orgName, assignDate, duration, emailId } = req.body;

    // Créer un nouveau certificat dans la base de données MongoDB
    const certificate = new Certificate({
      candidateName,
      courseName,
      orgName,
      assignDate,
      duration,
      emailId
    });

    // Sauvegarder le certificat dans la base de données
    await certificate.save();

    // Envoyer la réponse avec le certificat généré
    res.status(201).json(certificate);
  } catch (error) {
    console.error("Error generating certificate:", error);
    res.status(500).send("Internal Server Error");
  }
};

// Fonction pour récupérer un certificat spécifique
exports.getCertificate = async (req, res) => {
  try {
    const { certificateId } = req.params;

    // Rechercher le certificat par son ID dans la base de données
    const certificate = await Certificate.findById(certificateId);

    // Vérifier si le certificat existe
    if (!certificate) {
      return res.status(404).send("Certificate not found");
    }

    // Envoyer la réponse avec le certificat trouvé
    res.status(200).json(certificate);
  } catch (error) {
    console.error("Error fetching certificate:", error);
    res.status(500).send("Internal Server Error");
  }
};

// Fonction pour vérifier un certificat
exports.verifyCertificate = async (req, res) => {
  try {
    const { certificateId } = req.params;

    // Rechercher le certificat par son ID dans la base de données
    const certificate = await Certificate.findById(certificateId);

    // Vérifier si le certificat existe
    if (!certificate) {
      return res.status(404).send("Certificate not found");
    }

    // Envoyer la réponse avec une confirmation de vérification
    res.status(200).json({ verified: true, certificate });
  } catch (error) {
    console.error("Error verifying certificate:", error);
    res.status(500).send("Internal Server Error");
  }
};

