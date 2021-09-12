const Joi = require('joi');

module.exports.login = Joi.object({
  email: Joi.string()
    .label('Email')
    .required(),
  password: Joi.string()
    .label('Password')
    .required(),
});

module.exports.register = Joi.object({
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    .label('Email')
    .required(),
  password: Joi.string()
    .alphanum()
    .min(8)
    .label('Password')
    .required(),
});