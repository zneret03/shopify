/**
 * This function will handle http response to the client
 * @param {number} statusCode
 * @param {object} body
 */

module.exports = (statusCode, body) => {
  return {
    statusCode,
    body: JSON.stringify(body),
  };
};
