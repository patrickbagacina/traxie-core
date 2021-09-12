const Manager = require('../models/manager');

module.exports.register = (req) => {
  const manager = new Manager({
    email: 'test@123',
    password: 'test'
  });

  return manager.save();
} 