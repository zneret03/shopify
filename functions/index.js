//**Products */
const addProduct = require("./helpers/product/addProduct");
const updateProduct = require("./helpers/product/updateProduct");
const deleteProduct = require("./helpers/product/deleteProduct");
//**Sign in */
const signIn = require("./helpers/user/signIn");
//**Cart */
const checkOut = require("./helpers/cart/checkOut");
const addCart = require("./helpers/cart/addCart"); //**Collections */
const callback = require("./callback");
//**Customer Information */
const updateCustomerInformation = require("./helpers/customerInformation/updateCustomerInformation");
const httpRequest = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  DELETE: "DELETE",
};

exports.handler = async (event) => {
  switch (event.queryStringParameters["name"]) {
    case "addProduct":
      if (event.httpMethod === httpRequest.POST) {
        return await addProduct(event);
      }
    case "addCart":
      if (event.httpMethod === httpRequest.POST) {
        return await addCart(event);
      }
    case "checkOut":
      if (event.httpMethod === httpRequest.POST) {
        return await checkOut(event);
      }
    case "signIn":
      if (event.httpMethod === httpRequest.POST) {
        return await signIn(event);
      }
    case "updateProduct":
      if (event.httpMethod === httpRequest.PUT) {
        return await updateProduct(event);
      }
    case "updateCustomerInformation":
      if (event.httpMethod === httpRequest.PUT) {
        return await updateCustomerInformation(event);
      }
    case "deleteProduct":
      if (event.httpMethod === httpRequest.DELETE) {
        return await deleteProduct(event);
      }
    default:
      return callback(405, {});
  }
  //return callback(200, event.queryStringParameters.name);
};
