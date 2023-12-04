const httpReturnCodes = {
  OK            : 200,
  NOT_FOUND     : 404,
  FORBIDDEN     : 403, // pas les permissions
  UNAUTHORIZED  : 401, // token tout claqué
  BAD_REQUEST   : 400,
  INTERNAL_SERVER_ERROR : 500,
  SERVICE_UNAVAILABLE   : 503,
}

module.exports.httpReturnCodes = httpReturnCodes
