const Joi = require('joi');

const userValidation = Joi.object({
     
    email : Joi.string().required().min(3).max(30),
    password : Joi.string().required().min(8).max(30)

});

module.exports = userValidation;