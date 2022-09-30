const Joi = require("joi");

function validateCreateCompany(inputData) {
  const Schema = Joi.object({
    companyName: Joi.string().required(),

    email: Joi.string().email({ minDomainSegments: 2 }).required(),

    address: Joi.string().required(),

    username: Joi.string().alphanum().min(3).max(30).required(),

    password: Joi.string()
      .min(6)
      .required()
      .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),

    databaseName: Joi.string().required(),
  });

  return Schema.validate(inputData);
}

function validateLoginRegister(inputData) {
  const Schema = Joi.object({
    username: Joi.string().alphanum().min(3).max(30).required(),

    password: Joi.string()
      .min(6)
      .required()
      .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),

    role: Joi.string().required(),
  });

  return Schema.validate(inputData);
}

function validateLogin(inputData) {
  const Schema = Joi.object({
    username: Joi.string().alphanum().min(3).max(30).required(),

    password: Joi.string()
      .min(6)
      .required()
      .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
  });

  return Schema.validate(inputData);
}

exports.validateCreateCompany = validateCreateCompany;
exports.validateLoginRegister = validateLoginRegister;
exports.validateLogin = validateLogin;
