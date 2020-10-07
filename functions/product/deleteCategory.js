const { firebaseDb } = require("../firebaseAdmin");
const callback = require("../callback");

/**
 * This function will be responsible to delete category
 * @param {object} event
 */
module.exports = async (event) => {
  try {
    /**@type {string} id */
    const { id } = JSON.parse(event.body);
    const document = firebaseDb.collection("Category").doc(id);

    /**
     * This code will be responsible
     * On deleting
     * @event delete
     */

    id && (await document.delete());

    /**Return "Successfully added to cart" if success */
    return callback(200, "Successfully deleted");
  } catch (error) {
    /**Hence return 405 for function fails
     * @type {any} error message
     */
    console.log(error.message);
    return callback(405, {});
  }
};
