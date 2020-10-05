const { firebaseDb } = require("../firebaseAdmin");
const callback = require("../callback");

/**
 *This function will handle category information
 *Set all category informatin to the cloud
 * @event body
 */

module.exports = async (event) => {
  try {
    /**
     * @type {string} uid
     * @type {string} category
     * @type {string} dateToday
     */
    const { uid, category, dateToday } = JSON.parse(event.body);

    const document = firebaseDb.collection("Category").doc();

    /**
     *This set of code will be responsible
     *To save information to cloud
     @event Setting/Adding
     */
    await document.set({
      uid: uid,
      category: category,
      date_created: dateToday,
    });

    /**Return "Successfully added to cart" if success */
    return callback(200, "Successfully added");
  } catch (error) {
    /**Hence return 405 for function fails
     * @type {any} error message
     */
    console.log(error.message);
    callback(405, {});
  }
};
