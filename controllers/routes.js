const express = require('express'),
  router = express.Router();

// controllers
const accountsCtrl = require('./accounts-controller');

// accounts routes
router.post('/accounts/register', accountsCtrl.register);

module.exports = router;
