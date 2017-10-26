var Joi = require('joi');

module.exports = {

  login: {
    body: {
      email: Joi.string().email().required(),
      password: Joi.string().regex(/[a-zA-Z0-9]{3,30}/).required()
    }
  },

  edit: {
    body: {
      email: Joi.string().email(),
      first_name: Joi.string(),
      last_name: Joi.string(),
    }
  }

};
