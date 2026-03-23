export const createError = (statusCode, message) => {
  const error = new Error();
  error.message = message;   // error message
  error.code = statusCode;   // status code
  return error;
};