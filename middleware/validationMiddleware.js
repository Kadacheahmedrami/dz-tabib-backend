const Joi = require('joi');

const validateRegistration = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().min(2).max(100).required(),
    full_name: Joi.string().min(2).max(150).required(),
    email: Joi.string().email().required(),
    password: Joi.string()
      .min(8)
      .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$'))
      .message('Password must be complex'),
    phone: Joi.string().optional(),
    location: Joi.string().optional(),
    diploma_code: Joi.string().optional()
  });

  const { error } = schema.validate(req.body);
  
  if (error) {
    return res.status(400).json({ 
      error: 'Validation failed', 
      details: error.details.map(detail => detail.message) 
    });
  }

  next();
};

const validateLogin = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    userType: Joi.string().valid('doctor', 'patient').required()
  });

  const { error } = schema.validate(req.body);
  
  if (error) {
    return res.status(400).json({ 
      error: 'Validation failed', 
      details: error.details.map(detail => detail.message) 
    });
  }

  next();
};

module.exports = {
  validateRegistration,
  validateLogin
};