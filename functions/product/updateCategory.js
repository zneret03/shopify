const { firebaseDb } = require("../firebaseAdmin");
const callback = require("../callback");

/**
 * This function will be responsible
 * For updating all catefory data
 * @event body
 */

module.exports = async (event) => {
  try {
    /**
     * @type {string} id
     * @type {string} category
     * @type {string} dateToday
     */
    const { id, category, dateToday } = JSON.parse(event.body);

    /**
     * Setting id to the category
     * collection to select specific item
     */

    const document = firebaseDb.collection("Category").doc(id);

    /**
     * This will trigger the data to update
     */

    category &&
      document.update({
        category: category,
        date_updated: dateToday,
      });

    /**Return "Successfully added to cart" if success */
    return callback(200, "Success");
  } catch (error) {
    /**Hence return 405 for function fails
     * @type {any} error message
     */
    console.log(error.message);
    return callback(405, {});
  }
};
