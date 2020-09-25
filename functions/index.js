//**Products */
const addProduct = require("./product/addProduct");
const updateCategory = require("./product/updateCategory");
const deleteCategory = require("./product/deleteCategory");
const addCategory = require("./product/addCategory");
const updateProduct = require("./product/updateProduct");
const deleteProduct = require("./product/deleteProduct");

//**Sign in */
const signIn = require("./user/signIn");

//**Cart */
const checkOut = require("./cart/checkOut");
const addCart = require("./cart/addCart"); //**Collections */
const callback = require("./callback");

//**Customer Information */
const updateCustomerInformation = require("./customerInformation/updateCustomerInformation");
const deleteCustomerInformation = require("./customerInformation/deleteCustomerInformation");

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
    case "addCategory":
      if (event.httpMethod === httpRequest.POST) {
        return await addCategory(event);
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
    case "updateCategory":
      if (event.httpMethod === httpRequest.PUT) {
        return await updateCategory(event);
      }
    case "deleteProduct":
      if (event.httpMethod === httpRequest.DELETE) {
        return await deleteProduct(event);
      }
    case "deleteCategory":
      if (event.httpMethod === httpRequest.DELETE) {
        return await deleteCategory(event);
      }
    case "deleteCustomer":
      if (event.httpMethod === httpRequest.DELETE) {
        return await deleteCustomerInformation(event);
      }
    default:
      return callback(405, {});
  }
  //return callback(200, event.queryStringParameters.name);
};
