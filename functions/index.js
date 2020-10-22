/**
 * Product files
 */
const addProduct = require("./product/addProduct");
const stocKAdjustment = require("./product/stockAdjustment");
const updateCategory = require("./product/updateCategory");
const deleteCategory = require("./product/deleteCategory");
const addCategory = require("./product/addCategory");
const updateProduct = require("./product/updateProduct");
const deleteProduct = require("./product/deleteProduct");
const deleteUnfulfilled = require("./product/deleteUnfulfilled");
/**
 * Userfiles
 */
const signIn = require("./user/signIn");

/**
 * Cart files
 */
const checkOut = require("./cart/checkOut");
const addCart = require("./cart/addCart"); //**Collections */
const callback = require("./callback");

/**
 * Customer Information files
 */
const updateCustomerInformation = require("./customerInformation/updateCustomerInformation");
const deleteCustomerInformation = require("./customerInformation/deleteCustomerInformation");

/**
 * This object will handle all the HTTP types
 */
const httpRequest = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  DELETE: "DELETE",
};

/**
 * This event will handle all the necessary
 * function that will be exported to specific files
 * @event queryStringParameters
 */

exports.handler = async (event) => {
  switch (event.queryStringParameters["name"]) {
    case "addProduct":
      if (event.httpMethod === httpRequest.POST) {
        return await addProduct(event);
      }
    case "stockAdjustment":
      if (event.httpMethod === httpRequest.POST) {
        return await stocKAdjustment(event);
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
    case "deleteUnfulfilled":
      if (event.httpMethod === httpRequest.DELETE) {
        return await deleteUnfulfilled(event);
      }
    default:
      /**return 405 if the queryStringParameters fails*/
      return callback(405, {});
  }
};
