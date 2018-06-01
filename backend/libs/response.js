const logger = require('./logger');

let generate = (res, error, message, status, data) => {
  const response = { error, message, status, data };
  res.json(response);
  return response;
};

/**
 * 
 * @param {ResponseObject} res 
 * @param {String|Object} error 
 * @param {Number} status 
 */
let error = (res, error, status) => {
  // logger.log('Response.Error', JSON.stringify(error));
  let err = {};

  if (status !== undefined) {
    err.message = error;
    err.status = status;
  } else if (error.custom) {
    err = error;
  } else if (error.name === 'ValidationError' || error.code === '11000') {
    err.message = 'Data validation failed. Please check your data.';
    err.status = 422;
  } else {
    err.message = 'Error occurred.';
    err.status = 500;
  }

  return generate(res, true, err.message, err.status, null);
};

module.exports = { generate, error };