const { firebaseDb } = require("../firebaseAdmin");
const callback = require("../callback");

/**
 * This function will be responsible
 * For updating all product data
 * @param {object} event
 */

module.exports = async (event) => {
  try {
    /**
     * Object of product infortmation
     *
     * @type {string} product
     * @type {string} title
     * @type {string} purpose
     * @type {number} price
     * @type {number} quantity
     * @type {string} gender
     * @type {string} description
     */

    const {
      product,
      title,
      purpose,
      price,
      quantity,
      gender,
      description,
    } = JSON.parse(event.body);

    /**
     * Converting price to number
     * Conerting quantity to number
     * @type {number} price
     * @type {number} quantity
     */
    let productPrice = Number(price);
    let productQuantity = Number(quantity);

    /**@event queryStringParameters */

    const productId = event.queryStringParameters["productId"];

    /**assigning productId to product collection document */
    const document = firebaseDb.collection("product").doc(productId);

    /**
     * this code will be responsible on updating product
     */
    await document.update({
      product: product,
      title: title,
      purpose: purpose,
      price: productPrice,
      quantity: productQuantity,
      gender: gender,
      description: description,
    });

    /**Return "Successfully added to cart" if success */
    return callback(200, "Product Updated Successfully");
  } catch (error) {
    /**Hence return 405 for function fails
     * @type {any} error message
     */
    console.log(error.message);
    return callback(405, {});
  }
};
