const mongoose = require('mongoose');

const UniversitySchema = mongoose.Schema(
  {
    
    _id: { 
      type: mongoose.Types.ObjectId, required: true 
    },
    nombre: {
      type: String,
      required: true
    },
    siglas: {
      type: String,
      required: true
    },
    direccion: {
      type: String,
      required: true
    },
    telefono: {
      type: String,
      required: true
    }
  },
  { timestamps: false,
    collection: "Universidades",
    versionKey: false,
   }
);

const University = mongoose.model('University', UniversitySchema);
module.exports = University;


