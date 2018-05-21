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
  notFound
}

module.exports.DefaultResponses = DefaultResponses;
