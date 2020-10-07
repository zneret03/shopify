const { firebaseDb } = require("../firebaseAdmin");
const callback = require("../callback");

/**
 *This function will be responsible
 *Deleting the specfic customer Information
 *Along with his/her orders
 * @param {string} config with id in it
 */

const onDeleteCustomerOrder = async (config) => {
  try {
    const document = firebaseDb.collection("transaction").doc(config);

    /**awaiting the function to finish
     * performing when
     * deleting data from cloud
     */

    config && (await document.delete());
  } catch (error) {
    console.log(message);
    return callback(405, {});
  }
};

module.exports = async (event) => {
  try {
    /**
     * getting items array of object from client
     * and assigning customer Id URI parameters to customerID variable
     * @type {Object[]} items
     * @event queryStringParameters
     */
    const { items } = JSON.parse(event.body);
    const customerId = event.queryStringParameters["customerId"];

    /**Assigning queryStringParameters to collection Customer Information */
    const document = firebaseDb
      .collection("customerInformation")
      .doc(customerId);

    /**
     * Deleting Customer Information
     * Passing arguments to onDeleteCustomerOrder function
     * all the Id from customer order items
     * @type {string} customerId
     */

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
