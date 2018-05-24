const invalidCredentials = {
  error : {
    errorCode: 4001,
    message: "usuario o password incorrectos"
  }
}

const userNotFound = {
  error : {
    errorCode: 4002,
    message: "no se encontró el usuario"
  }
}

const unHandledError = {
  error: {
    errorCode: 5001,
    message: "Ocurrió un error inesperado"
  }
}

const noTokenProvided = {
  error: {
    errorCode: 403,
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
  noTokenProvided,
  tokenExpired
}

exports.DefaultResponses = DefaultResponses;
