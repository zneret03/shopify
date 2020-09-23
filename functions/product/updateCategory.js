const { firebaseDb } = require("../firebaseAdmin");
const callback = require("../callback");

module.exports = async (event) => {
  try {
    const { id, uid, category, dateToday } = JSON.parse(event.body);
    const document = firebaseDb.collection("Category").doc(id);

    if (uid) {
      category &&
        document.update({
          category: category,
          date_updated: dateToday,
        });
    }
    // console.log({ id, uid, category, dateToday });

    return callback(200, "Success");
  } catch (error) {
    console.log(error.message);
    return callback(405, {});
  }
};
