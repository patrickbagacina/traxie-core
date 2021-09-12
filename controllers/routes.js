const express = require('express'),
  router = express.Router(),
  joi = require('express-joi-validation');

// validator
const validator = joi.createValidator();

// controllers
const usersCtrl = require('./users-controller');

// users routes
const userValidators = require('../validators/users-validator');
router.post(
  '/users/register', 
  validator.body(userValidators.register),
  usersCtrl.register,
);

module.exports = router;
