const invalidCredentials = {
  error : {
    errorCode: 400,
    message: "usuario o password incorrectos"
  }
}

const badRequest = {
  error : {
    errorCode: 400,
    message: "Bad Request"
  }
}

const userNotFound = {
  error : {
    errorCode: 401,
    message: "no se encontró el usuario"
  }
}

const unHandledError = {
  error: {
    errorCode: 500,
    message: "Ocurrió un error inesperado"
  }
}

const noTokenProvided = {
  error: {
    errorCode: 401,
    message: "Token was not provided"
  }
}

const tokenExpired = {
  error: {
    errorCode: 401,
    message: "Token expired"
  }
}

const notFound = {
  error: {
    errorCode: 404,
    message: "Not found"
  }
}

const DefaultResponses = {
  invalidCredentials,
  userNotFound,
  unHandledError,
  notFound,
  badRequest,
  noTokenProvided,
  tokenExpired
}

exports.DefaultResponses = DefaultResponses;
