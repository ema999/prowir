module.exports = {

	/* ------------------- System ----------------- */

	unknownError : {
		httpStatus : 500,
		description : "Something went wrong."
	},

	/* -------------------- HTTP -------------------- */

	notFound : {
		httpStatus : 404,
		description : "Page not found."
	},
	forbidden : {
		httpStatus : 401,
		description : "You don't have enough permissions to do that."
	},

  /* -------------------- Users -------------------- */

  loginFailed : {
    httpStatus : 401,
		description : "User or password incorrect."
  },

  tokenGeneratorFailed : {
    httpStatus : 500,
		description : "Token generator failed."
  },

  invalidToken : {
    httpStatus : 401,
		description : "Invalid Token."
  }

};
