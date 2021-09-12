const express = require('express'),
  router = express.Router();

// controllers
const usersCtrl = require('./users-controller');

// users routes
router.post('/users/register', usersCtrl.register);

module.exports = router;
