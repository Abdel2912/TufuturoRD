const mongoose = require('mongoose');

const carrerasSchema = mongoose.Schema(
  {
    
    _id: { 
      type: mongoose.Types.ObjectId, required: true 
    },
    nombre: {
      type: String,
      required: true
    },
    universidad: {
      type: String,
      required: true
    },
    facultad: {
      type: String,
      required: true
    },
    duracion: {
      type: String,
      required: true
    }
  },
  { timestamps: false,
    collection: "Carreras",
    versionKey: false,
   }
);

const carreras = mongoose.model('carreras', carrerasSchema);
module.exports = carreras;