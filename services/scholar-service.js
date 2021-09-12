const Scholar = require('../models/scholar');

module.exports.create = async (req) => {
  const exists = await Scholar.findOne({email: req.ronin});

  if (exists) return Promise.resolve({
    error: {
      code: 'USER_ALREADY_EXISTS',
      message: 'User already exists',
    }
  });

  const scholar = new Scholar({
    manager: req.manager,
    name: req.name,
    ronin: req.ronin,
    percentage: req.percentage,
  });

  return scholar.save();
}