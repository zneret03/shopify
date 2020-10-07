const { firebaseDb } = require("../firebaseAdmin");
const callback = require("../callback");

/**
 * this function is intended to delete specific unfilfilled items
 * @event body
 */
module.exports = async (event) => {
  try {
    /**
     *getting the id of unifulfilled items
     * @type {string} id
     */
    const { id } = JSON.parse(event.body);

    /**assigning the id to the transaction collection documents */
    const document = firebaseDb.collection("transaction").doc(id);

    /**Perform delete */
    await document.delete();
    return callback(200, "Successfully Deleted");
  } catch (error) {
    console.log(error);
    return callback(405, {});
  }
};
