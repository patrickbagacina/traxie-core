const express = require('express'),
  router = express.Router(),
  joi = require('express-joi-validation');

// validator
const validator = joi.createValidator();
const userValidators = require('../validators/users-validator');
const scholarsValidators = require('../validators/scholars-validator');

// controllers
const usersCtrl = require('./users-controller');
const scholarsCtrl = require('./scholars-controller');

// middleware
const auth = require('../middleware/auth');

// users routes
router.post(
  '/users/login', 
  validator.body(userValidators.login),
  usersCtrl.login,
);

router.post(
  '/users/register', 
  validator.body(userValidators.register),
  usersCtrl.register,
);

// scholars routes
router.post(
  '/scholars/create',
  auth.verifyToken,
  validator.body(scholarsValidators.create),
  scholarsCtrl.createScholar,
);

module.exports = router;
