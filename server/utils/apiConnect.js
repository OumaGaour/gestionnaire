const axios = require("axios");

// Fonction pour générer un certificat
const generateCertificate = (
  candidateName,
  courseName,
  orgName,
  assignDate,
  duration,
  emailId
) =>
  axios.post("/api/certificate/generate", {
    candidateName,
    courseName,
    orgName,
    assignDate,
    duration,
    emailId
  })
  .then(response => response.data)
  .catch(error => {
    console.error('Error generating certificate:', error);
    throw error;
  });

// Fonction pour récupérer un certificat spécifique
const getCertificate = certificateId =>
  axios.get(`/api/certificate/data/${certificateId}`)
  .then(response => response.data)
  .catch(error => {
    console.error('Error fetching certificate:', error);
    throw error;
  });

// Fonction pour vérifier un certificat
const verifyCertificate = certificateId =>
  axios.get(`/api/certificate/verify/${certificateId}`)
  .then(response => response.data)
  .catch(error => {
    console.error('Error verifying certificate:', error);
    throw error;
  });

module.exports = {
  generateCertificate,
  getCertificate,
  verifyCertificate
};
