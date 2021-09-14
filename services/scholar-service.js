const Scholar = require('../models/scholar');
const ex = require('./exceptions');
const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

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

module.exports.list = async (req) => {
  const { manager, claimable, startDate, endDate } = req;

  const scholars = await Scholar.find({manager: manager});

  // filter results

  return scholars;
}

module.exports.sync = async (req) => {
  try {
    const updated = [];
    const scholars = [];
    const validate = (s) => {
      if (!s.id) return new ex.ValidationException('ID is required');
      if (!mongoose.Types.ObjectId.isValid(s.id)) return new ex.ValidationException('Invalid ID');
      if (!s.collected) return new ex.ValidationException('Collected SLP is required');
      if (!Number.isSafeInteger(s.collected)) return new ex.ValidationException('Invalid Collected SLP');
      if (!s.total) return new ex.ValidationException('Total SLP is required');
      if (!Number.isSafeInteger(s.total)) return new ex.ValidationException('Invalid Total SLP');

      return null;
    };

    await new Promise((resolve, reject) => {
      req.scholars.forEach(async (s, index) => {
        const err = validate(s);
  
        if (err) {
          scholars.push(err);
          return;
        }
  
        const scholar = await Scholar.findById(s.id);
  
        scholars.push(scholar ? scholar : new ex.UserNotFoundException(s.id));

        if (index === (req.scholars.length - 1)) resolve();
      });
    });

    const error = scholars.find((s) => s instanceof ex.ValidationException || s instanceof ex.UserNotFoundException);

    if (error) return Promise.resolve({
      error: {
        code: error.code,
        message: error.message,
      }
    });

    await new Promise((resolve, reject) => {
      req.scholars.forEach(async (s, index) => {
        const scholar = scholars.find((u) => u._id.toString() == s.id);
        const slps = scholar.slps;
  
        const now = new Date();
  
        const sameDate = slps.findIndex((slp) => {
          const d = new Date(slp.date);
  
          return now.getDate() == d.getDate();
        });
        const current = slps.findIndex((slp) => slp.isCurrent);
  
        if (sameDate === -1) {
          // just add new slp record
          const slp = {
            id: uuidv4(),
            date: now.toISOString().split('T')[0],
            collected: s.collected,
            total: s.total,
            isClaimed: false,
            isCurrent: true
          };
  
          // push slp to scholar.slps
          slps.push(slp);
  
          // update isCurrent slp
          if (current !== -1)
            slps[current] = {
              ...slps[current],
              isCurrent: false,
            };
        } else {
          slps[sameDate] = {
            ...slps[sameDate],
            collected: s.collected,
            total: s.total,
          };
        }

        console.log(slps);
        console.log(scholar);
  
        // save scholar changes
        scholar.slps = slps;
        await scholar.save();

        updated.push(scholar);

        if (index === (req.scholars.length - 1)) resolve();
      });
    });

    return updated;
  } catch (err) {
    return Promise.resolve({
      error: {
        code: err.code,
        message: err.message,
      }
    });
  }
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