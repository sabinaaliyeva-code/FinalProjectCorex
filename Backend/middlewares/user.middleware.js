const userValidation = require('../validation/users.validation');

const userMiddleware = async (req, res, next) => {

    const validate = userValidation.validate(req.body);

    if(validate.error){
        
        console.log(validate.error.details[0].message);
        return res.status(400).json({message : validate.error.details[0].message});
    }
    next();
};

module.exports = userMiddleware;