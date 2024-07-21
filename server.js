const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const { PythonShell } = require('python-shell');
const dbConfig = require('./config/db.config');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para manejar JSON en solicitudes
app.use(express.json());

// Servir archivos estáticos desde 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Conexión a MongoDB
mongoose.connect(dbConfig.mongodb.URI)
  .then(() => {
    console.log('Successfully connected to MongoDB.');
  })
  .catch(err => {
    console.error('Connection error', err);
    process.exit();
  });

// Ruta para servir el archivo CSV
app.get('/preguntas.csv', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'preguntas.csv'));
});

// Ruta para la recomendación
app.post('/recommend', (req, res) => {
  const userResponses = req.body;

  // Verifica que se reciban las respuestas del formulario
  console.log('Respuestas del usuario:', JSON.stringify(userResponses));

  const options = {
    mode: 'text',
    pythonOptions: ['-u'],
    scriptPath: path.join(__dirname, 'scripts'),
    args: [JSON.stringify(userResponses)]  // Convierte las respuestas del usuario a JSON
  };

  PythonShell.run('recommend_career.py', options, (err, results) => {
    if (err) {
      console.error('Error al ejecutar el script de Python:', err);
      res.status(500).send('Error al recomendar carrera');
      return;
    }

    console.log('Resultados del script de Python:', results);

    // Verifica que hay resultados
    if (results && results.length > 0) {
      try {
        // Decodifica el resultado en formato JSON
        const careerResult = JSON.parse(results[0]);
        res.json(careerResult);  // Enviar la respuesta como JSON
      } catch (parseError) {
        console.error('Error al parsear la respuesta del script de Python:', parseError);
        res.status(500).send('Error al procesar la respuesta de la recomendación');
      }
    } else {
      res.status(500).send('No se recibió una respuesta válida del script de Python');
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});




