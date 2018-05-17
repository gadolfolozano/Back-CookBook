const invalidCredentials = {
  error: 4001,
  message: "usuario o password incorrectos"
}

const userNotFound = {
  error: 4002,
  message: "no se encontró el usuario"
}

const unHandledError = {
  error: 5001,
  message: "Ocurrió un error inesperado"
}

const notFound = {
  error: 404,
  message: "Not found"
}

const DefaultResponses = {
  invalidCredentials,
  userNotFound,
  unHandledError,
  notFound
}

module.exports.DefaultResponses = DefaultResponses;
