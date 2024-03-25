const mongoose = require('mongoose');

// Définir le schéma du certificat
const certificateSchema = new mongoose.Schema({
  candidateName: {
    type: String,
    required: true
  },
  courseName: {
    type: String,
    required: true
  },
  orgName: {
    type: String,
    required: true
  },
  assignDate: {
    type: Date,
    required: true
  },
  duration: {
    type: Number,
    required: true
  },
  emailId: {
    type: String,
    required: true
  },
  certificateId: {
    type: String,
    required: true,
    unique: true
  }
});

// Créer un modèle de certificat à partir du schéma
const Certificate = mongoose.model('Certificate', certificateSchema);

// Exporter le modèle de certificat
module.exports = Certificate;
