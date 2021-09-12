const mongoose = require('mongoose');

// schema
const managerSchema = mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  scholars: {
    type: [String],
    required: false
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});

// export Manager Model
const Manager = module.exports = mongoose.model('managers', managerSchema);

module.exports.get = (callback, limit) => {
   Manager.find(callback).limit(limit); 
}