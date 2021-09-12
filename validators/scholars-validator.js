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

module.exports.delete = Joi.object({
  id: Joi.string()
    .label('ID')
    .required(),
});

module.exports.list = Joi.object({
  claimable: Joi.boolean()
    .label('Claimable'),
  startDate: Joi.string()
    .label('Start Date'),
  endDate: Joi.number()
    .label('End Date'),
});

module.exports.update = Joi.object({
  id: Joi.string()
    .label('ID')
    .required(),
  name: Joi.string()
    .label('Name')
    .required(),
  percentage: Joi.number()
    .min(0)
    .label('Percentage')
    .required(),
});