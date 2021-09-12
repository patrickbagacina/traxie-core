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

module.exports.list = async (req) => {
  const { manager, claimable, startDate, endDate } = req;

  const scholars = await Scholar.find({manager: manager});

  // filter results

  return scholars;
}

module.exports.update = async (req) => {
  const scholar = await Scholar.findById(req.id);

  if (!scholar) return Promise.resolve({
    error: {
      code: 'USER_NOT_FOUND',
      message: 'User not found',
    }
  });

  scholar.name = req.name;
  scholar.percentage = req.percentage;

  return scholar.save();
}

module.exports.deleteScholar = async (req) => {
  const scholar = await Scholar.findById(req.id);

  if (!scholar) return Promise.resolve({
    error: {
      code: 'USER_NOT_FOUND',
      message: 'User not found',
    }
  });

  return Scholar.deleteOne({_id: req.id});
}