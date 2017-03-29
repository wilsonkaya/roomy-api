'use strict';

const controller = require('lib/wiring/controller');
const models = require('app/models');
const Review = models.review;

const authenticate = require('./concerns/authenticate');
const setUser = require('./concerns/set-current-user');
const setModel = require('./concerns/set-mongoose-model');

const index = (req, res, next) => {
  Review.find({ reviews: req.query.reviews })
    .then(reviews => res.json({
      reviews: reviews.map((e) =>
        e.toJSON({ virtuals: true, user: req.user })),
    }))
    .catch(next);
};

const indexMyReviews = (req, res, next) => {
  Review.find({ _owner: req.user })
    .then(reviews => res.json({
      reviews: reviews.map((e) =>
        e.toJSON({ virtuals: true, user: req.user })),
    }))
    .catch(next);
};

const show = (req, res) => {
  res.json({
    review: req.review.toJSON({ virtuals: true, user: req.user }),
  });
};

const create = (req, res, next) => {
  let review = Object.assign(req.body.review, {
    _owner: req.user._id,
  });
  Review.create(review)
    .then(review =>
      res.status(201)
        .json({
          review: review.toJSON({ virtuals: true, user: req.user }),
        }))
    .catch(next);
};

const update = (req, res, next) => {
  delete req.body._owner;  // disallow owner reassignment.
  req.review.update(req.body.review)
    .then(() => res.sendStatus(204))
    .catch(next);
};

const destroy = (req, res, next) => {
  req.review.remove()
    .then(() => res.sendStatus(204))
    .catch(next);
};

module.exports = controller({
  index,
  indexMyReviews,
  show,
  create,
  update,
  destroy,
}, { before: [
  { method: setUser, only: ['index', 'show', 'indexMyReviews'] },
  { method: authenticate, except: ['index', 'show'] },
  { method: setModel(Review), only: ['show'] },
  { method: setModel(Review, { forUser: true }), only: ['update', 'destroy'] },
], });
