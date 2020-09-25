const { firebaseDb } = require("../firebaseAdmin");
const callback = require("../callback");

const onDeleteCustomerOrder = async (config) => {
  try {
    const document = firebaseDb.collection("transaction").doc(config);
    config && (await document.delete());
  } catch (error) {
    console.log(message);
    return callback(405, {});
  }
};

module.exports = async (event) => {
  try {
    const { items } = JSON.parse(event.body);
    const customerId = event.queryStringParameters["customerId"];
    const document = firebaseDb
      .collection("customerInformation")
      .doc(customerId);

    if (customerId) {
      await document.delete().then(() => {
        items.map((id) => {
          onDeleteCustomerOrder(id);
        });
      });
    }

    return callback(200, "Successfully deleted");
  } catch (error) {
    console.log(error.message);
    return callback(405, {});
  }
};
