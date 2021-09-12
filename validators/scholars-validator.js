const Joi = require('joi');

module.exports.create = Joi.object({
  name: Joi.string()
    .label('Name')
    .required(),
  ronin: Joi.string()
    .label('Ronin Address')
    .required(),
  percentage: Joi.number()
    .min(0)
    .label('Percentage')
    .required(),
});