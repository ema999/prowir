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
  },

  search: {
    body: {
      limit: Joi.number().min(1).max(20),
      page: Joi.number().min(0)
    }
  },

  delete: {
    body: {
      users: Joi.array()
    }
  }

};
