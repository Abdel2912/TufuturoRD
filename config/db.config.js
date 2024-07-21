require('dotenv').config();

module.exports = {
  mongodb: {
    URI: process.env.MONGO_URI || 'mongodb://localhost:27017/UniversidadesSantoDomingo?directConnection=true'
  }
};


