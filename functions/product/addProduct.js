const { firebaseDb } = require("../firebaseAdmin");
const callback = require("../callback");

/**
 * This function will handle product information
 * Product information will store to cloud
 * @event body
 */

module.exports = async (event) => {
  try {
    /**
     * Object of product Information
     * @type {string} uid
     * @type {string} fileName
     * @type {string} product
     * @type {string} title
     * @type {string} purpose
     * @type {number} price
     * @type {string} category
     * @type {number} quantity
     * @type {string} image Url
     * @type {string} date
     * @type {string} gender
     * @type {string} description
     * @type {string} size
     */
    const {
      uid,
      fileName,
      product,
      title,
      purpose,
      price,
      category,
      quantity,
      imageUrl,
      date,
      gender,
      description,
      size,
    } = JSON.parse(event.body);

    /**
     * This code will be responsible
     * For Setting/Adding Product information to the cloud
     * @event Adding
     */

    await firebaseDb.collection("product").add({
      uid,
      fileName,
      product,
      title,
      purpose,
      price,
      category,
      quantity,
      imageUrl,
      date,
      gender,
      description,
      size,
    });

    /**Return "Successfully added to cart" if success */
    return callback(200, "Successfully Inserted");
  } catch (error) {
    /**Hence return 405 for function fails
     * @type {any} error message
     */
    console.log(error.message);
    return callback(405, {});
  }
};
