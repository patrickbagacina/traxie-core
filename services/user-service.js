const Manager = require('../models/manager');
const Scholar = require('../models/scholar');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const saltRounds = 10;

module.exports.getMe = async (user) => {
  console.log(user)
  if (user.type === 'MANAGER') {
    const manager = await Manager.findById(user.user_id);

    return {
      user_id: manager._id,
      email: manager.email,
      scholars: manager.scholars,
    };
  } else if (user.type === 'SCHOLAR') {
    const manager = await Scholar.findById(user.user_id);

    return manager;
  }

  return Promise.resolve({
    error: {
      code: 'USER_NOT_FOUND',
      message: 'User not found',
    }
  });
}

module.exports.login = async (req) => {
  const credError = {
    error: {
      code: 'INVALID_CREDENTIALS',
      message: 'Invalid email or password',
    }
  };

  const manager = await Manager.findOne({email: req.email});

  if (!manager) return Promise.resolve(credError);

  const match = await bcrypt.compare(req.password, manager.password);

  if (!match) return Promise.resolve(credError);

  const token = jwt.sign(
    { 
      user_id: manager._id, 
      email: manager.email,
      type: 'MANAGER',
    },
    process.env.JWT_KEY,
    { expiresIn: '2h' }
  );

  return Promise.resolve({
    user_id: manager._id,
    email: manager.email,
    access_token: token
  });
} 

module.exports.register = async (req) => {
  const hashed = await bcrypt.hash(req.password, saltRounds);

  const exists = await Manager.findOne({email: req.email});

  if (exists) return Promise.resolve({
    error: {
      code: 'EMAIL_ALREADY_EXISTS',
      message: 'Email is already used',
    }
  });

  const manager = new Manager({
    email: req.email,
    password: hashed
  });

  return manager.save();
} 