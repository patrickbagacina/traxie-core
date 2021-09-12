const mongoose = require('mongoose');

// schema
const scholarSchema = mongoose.Schema({
  manager: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  ronin: {
    type: String,
    required: true
  },
  percentage: {
    type: Number,
    required: true
  },
  slps: {
    type: [Object],
    required: false
  },
  cashouts: {
    type: [Object],
    required: false
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});

// export Scholar Model
const Scholar = module.exports = mongoose.model('scholars', scholarSchema);

module.exports.get = (callback, limit) => {
   Scholar.find(callback).limit(limit); 
}