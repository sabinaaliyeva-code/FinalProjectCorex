const Joi = require('joi');

const userValidation = Joi.object({
    firstName : Joi.string(),
    lastName : Joi.string(),
    email : Joi.string().required().min(3).max(30),
    password : Joi.string().required().min(8).max(30),
    role:Joi.string()

});

module.exports = userValidation;