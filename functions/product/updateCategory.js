const { firebaseDb } = require("../firebaseAdmin");
const callback = require("../callback");

module.exports = async (event) => {
  try {
    const { id, category, dateToday } = JSON.parse(event.body);
    const document = firebaseDb.collection("Category").doc(id);

    category &&
      document.update({
        category: category,
        date_updated: dateToday,
      });

    return callback(200, "Success");
  } catch (error) {
    console.log(error.message);
    return callback(405, {});
  }
};
