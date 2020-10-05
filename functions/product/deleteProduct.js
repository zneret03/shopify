const { firebaseDb } = require("../firebaseAdmin");
const callback = require("../callback");

/**
 * This function will be responsible to product category
 * @event body
 */

module.exports = async (event) => {
  try {
    /**@event queryStringParameters */
    const id = event.queryStringParameters["productId"];
    if (id) {
      const document = firebaseDb.collection("product").doc(id);
      /**
       * this code will be responsible
       * On Deleting
       * awaiting to delete function to finish
       * performing
       * @event delete
       */
      await document.delete();

      /**Return "Successfully added to cart" if success */
      return callback(200, "Successfully Deleted");
    }
  } catch (error) {
    /**Hence return 405 for function fails
     * @type {any} error message
     */
    console.log(error.message);
    return callback(405, {});
  }
};
