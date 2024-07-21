const { PythonShell } = require('python-shell');

module.exports = app => {
  const universities = require('../controllers/university.controller.js');
  const router = require('express').Router();

  // Otras rutas...

  // Ruta para recomendar una carrera
  router.post('/recommend', (req, res) => {
    let options = {
      scriptPath: 'path/to/your/python/scripts', // Reemplaza con la ruta correcta
      args: [
        req.body.respuesta1,
        req.body.respuesta2,
        req.body.respuesta3,
        req.body.respuesta4
      ]
    };

    PythonShell.run('recommend_career.py', options, function (err, results) {
      if (err) {
        console.error('Error:', err);
        res.status(500).send({ error: 'Error al hacer la recomendación' });
      } else {
        res.send({ carrera: results[0] });
      }
    });
  });

  app.use('/api/universities', router);
};
