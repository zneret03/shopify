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
const customerProfile = require("./user/customerProfile");
const updateSocial = require("./user/updateSocial");
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
 * this function will hold all rest api from productComponent
 * @event queryStringParameters 
 */

const productComponent = async(event) => {
  switch(event.queryStringParameters['name']){
    case "addProduct":
      if (event.httpMethod === httpRequest.POST) {
        return await addProduct(event);
      }
    case "updateProduct":
      if (event.httpMethod === httpRequest.PUT) {
         return await updateProduct(event);
      }
    case "deleteProduct":
      if (event.httpMethod === httpRequest.DELETE) {
        return await deleteProduct(event);
      }
  } 
} 

/**
 * this function will hold all rest api from customerComponents
 * @event queryStringParameters 
 */

const customerComponents = async(event) => {
  switch(event.queryStringParameters['name']){
    case "deleteCustomer":
      if (event.httpMethod === httpRequest.DELETE) {
        return await deleteCustomerInformation(event);
      }
    case "updateCustomerInformation":
      if (event.httpMethod === httpRequest.PUT) {
        return await updateCustomerInformation(event);
      }
  }
}

/**
 * this function will hold all rest api from stockAdjustmentComponent
 * @event queryStringParameters 
 */

const stockAdjustmentComponent = async(event) => {
  switch(event.queryStringParameters['name']){
    case "stockAdjustment":
      if (event.httpMethod === httpRequest.POST) {
        return await stocKAdjustment(event);
      }
  }
}

/**
 * this function will hold all rest api from categoryComponent
 * @event queryStringParameters 
 */

const categoryComponent = async(event) => {
  switch(event.queryStringParameters['name']){
    case "addCategory":
      if (event.httpMethod === httpRequest.POST) {
        return await addCategory(event);
      }
    case "updateCategory":
      if (event.httpMethod === httpRequest.PUT) {
        return await updateCategory(event);
      }
    case "deleteCategory":
      if (event.httpMethod === httpRequest.DELETE) {
        return await deleteCategory(event);
      }
  }
}

/**
 * this function will hold all rest api from transaction
 * @event queryStringParameters 
 */

const transaction = async(event) => {
  switch(event.queryStringParameters['name']){
    case "addCart":
      if (event.httpMethod === httpRequest.POST) {
        return await addCart(event);
      }
    case "checkOut":
      if (event.httpMethod === httpRequest.POST) {
        return await checkOut(event);
      }
  }
}

/**
 * this function will hold all rest api from userInformationComponent
 * @event queryStringParameters 
 */

const userInformationComponent = async(event) => {
  switch(event.queryStringParameters['name']){
    case "updateProfilePicture":
      if(event.httpMethod === httpRequest.PUT){
        return await customerProfile(event)
      }
    case "updateSocial":
      if(event.httpMethod === httpRequest.PUT){
        return await updateSocial(event)
      }
    case "signIn":
      if (event.httpMethod === httpRequest.POST) {
        return await signIn(event);
      }
  }
}

/**
 * this function will hold all rest api from unfulfilledComponent
 * @event queryStringParameters 
 */

const unfulfilledComponent = async(event) => {
  switch(event.queryStringParameters['name']){
    case "deleteUnfulfilled":
      if (event.httpMethod === httpRequest.DELETE) {
        return await deleteUnfulfilled(event);
      }
  }
}

/**
 * This event will handle all the necessary
 * function that will be exported to specific files
 * @event queryStringParameters
 */

exports.handler = async (event) => {
  switch (event.queryStringParameters["component"]) {
    case "productComponent": 
      return await productComponent(event)
    case "customerComponents": 
      return await customerComponents(event)
    case "stockAdjustmentComponent": 
      return await stockAdjustmentComponent(event)
    case "categoryComponent":   
      return await categoryComponent(event);
    case "transaction":   
      return await transaction(event);
    case "userInformationComponent" : 
      return await userInformationComponent(event);
    case "unfulfilledComponent":
      return await unfulfilledComponent(event);
    default:
      /**return 405 if the queryStringParameters fails*/
      return callback(405, {});
  }
};
