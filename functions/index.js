//**Products */
const addProduct = require('./product/addProduct');
const updateProduct = require('./product/updateProduct');
const deleteProduct = require('./product/deleteProduct');
//**Sign in */
const signIn = require('./user/signIn');
//**Cart */
const checkOut = require('./cart/checkOut')
const addCart = require('./cart/addCart');//**Collections */
const callback = require('./callback')

const httpRequest = {
   POST : "POST",
   PUT : "PUT",
   DELETE : "DELETE"
}

exports.handler = async(event) => {
   switch(event.queryStringParameters['name']){
      case "addProduct":
         if(event.httpMethod === httpRequest.POST){
            return await addProduct(event);
         }
      case "addCart":
         if(event.httpMethod === httpRequest.POST){
            return await addCart(event);
         }
      case "checkOut":
         if(event.httpMethod === httpRequest.POST){
            return await checkOut(event);
         }
      case "signIn" :
            if(event.httpMethod === httpRequest.POST){
               return await signIn(event);
            }
      case "updateProduct" :
         if(event.httpMethod === httpRequest.PUT){
            return await updateProduct(event);
         }
      case "deleteProduct" : 
         if(event.httpMethod === httpRequest.DELETE){
            return await deleteProduct(event);
         }
      default :
         return callback(405, {});                                            
   }
   //return callback(200, event.queryStringParameters.name);
}