const University = require('../models/university.model');

// Crear y guardar una nueva universidad
exports.create = (req, res) => {
  if (!req.body.name) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  const university = new University({
    name: req.body.name,
    programs: req.body.programs
  });

  university.save(university)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the University."
      });
    });
};

// Obtener todas las universidades
exports.findAll = (req, res) => {
  University.find()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving universities."
      });
    });
};

// Obtener una universidad por id
exports.findOne = (req, res) => {
  const id = req.params.id;

  University.findById(id)
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot find University with id=${id}.`
        });
      } else {
        res.send(data);
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving University with id=" + id
      });
    });
};

// Actualizar una universidad por id
exports.update = (req, res) => {
  const id = req.params.id;

  University.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update University with id=${id}. Maybe University was not found!`
        });
      } else {
        res.send({ message: "University was updated successfully." });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating University with id=" + id
      });
    });
};

// Eliminar una universidad por id
exports.delete = (req, res) => {
  const id = req.params.id;

  University.findByIdAndRemove(id, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete University with id=${id}. Maybe University was not found!`
        });
      } else {
        res.send({
          message: "University was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete University with id=" + id
      });
    });
};




