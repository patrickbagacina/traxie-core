const Manager = require('../models/manager');
const bcrypt = require('bcrypt');
const saltRounds = 10;

module.exports.register = async (req) => {
  const hashed = await bcrypt.hash(req.password, saltRounds);
  const manager = new Manager({
    email: req.email,
    password: hashed
  });

  return manager.save();
} 