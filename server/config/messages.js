module.exports = {

	/* ------------------- System ----------------- */

	unknownError : {
		httpStatus : 500,
		description : "Algo a salido mal."
	},

	/* -------------------- HTTP -------------------- */

	notFound : {
		httpStatus : 404,
		description : "Página no encontrada."
	},
	forbidden : {
		httpStatus : 401,
		description : "No tienes los permisos suficientes."
	},
	invalidParams : {
    httpStatus : 400,
		description : "Error en los parametros."
  },

  /* -------------------- Users -------------------- */

  loginFailed : {
    httpStatus : 401,
		description : "Usuario o Password incorrectos."
  },

  tokenGeneratorFailed : {
    httpStatus : 500,
		description : "Error al generar el token."
  },

  invalidToken : {
    httpStatus : 401,
		description : "Token inválido."
  }

};
