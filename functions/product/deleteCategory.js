const { firebaseDb } = require("../firebaseAdmin");
const callback = require("../callback");

module.exports = async (event) => {
  try {
    const { id } = JSON.parse(event.body);
    const document = firebaseDb.collection("Category").doc(id);
    id && (await document.delete());
    return callback(200, "Successfully deleted");
  } catch (error) {
    console.log(error.message);
    return callback(405, {});
  }
};
