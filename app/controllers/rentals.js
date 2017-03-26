'use strict';

const controller = require('lib/wiring/controller');
const models = require('app/models');
const Rental = models.rental;

const authenticate = require('./concerns/authenticate');
const setUser = require('./concerns/set-current-user');
const setModel = require('./concerns/set-mongoose-model');

const index = (req, res, next) => {
  Rental.find()
    .then(rentals => res.json({
      rentals: rentals.map((e) =>
        e.toJSON({ virtuals: true, user: req.user })),
    }))
    .catch(next);
};

const show = (req, res) => {
  res.json({
    rental: req.rental.toJSON({ virtuals: true, user: req.user }),
  });
};

const create = (req, res, next) => {
  let rental = Object.assign(req.body.rental, {
    _owner: req.user._id,
  });
  Rental.create(rental)
    .then(rental =>
      res.status(201)
        .json({
          rental: rental.toJSON({ virtuals: true, user: req.user }),
        }))
    .catch(next);
};

const update = (req, res, next) => {
  delete req.body._owner;  // disallow owner reassignment.
  req.rental.update(req.body.rental)
    .then(() => res.sendStatus(204))
    .catch(next);
};

const destroy = (req, res, next) => {
  req.rental.remove()
    .then(() => res.sendStatus(204))
    .catch(next);
};

module.exports = controller({
  index,
  show,
  create,
  update,
  destroy,
}, { before: [
  { method: setUser, only: ['index', 'show'] },
  { method: authenticate, except: ['index', 'show'] },
  { method: setModel(Rental), only: ['show'] },
  { method: setModel(Rental, { forUser: true }), only: ['update', 'destroy'] },
], });
