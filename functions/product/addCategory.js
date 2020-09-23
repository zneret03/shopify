const { firebaseDb } = require("../firebaseAdmin");
const callback = require("../callback");

module.exports = async (event) => {
  try {
    const { uid, category, dateToday } = JSON.parse(event.body);

    const document = firebaseDb.collection("Category").doc();

    await document.set({
      uid: uid,
      category: category,
      date_created: dateToday,
    });

    return callback(200, "Successfully added");
  } catch (error) {
    console.log(error);
    callback(405, {});
  }
};
