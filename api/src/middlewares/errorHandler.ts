const errorHandler = async (error, req, res, next) => {

  const name = error.name || 'Error'
  const message = error.message || 'Something went wrong'
  const status = error.statusCode || 500
  const stack = process.env.NODE_ENV === "development" ? error.stack : {}

  return res.status(status).json({name, message, status, stack})
}

export default errorHandler;