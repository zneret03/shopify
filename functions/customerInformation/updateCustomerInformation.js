const { firebaseDb } = require("../firebaseAdmin");
const callback = require("../callback");

/**
 * This function will be responsible
 * on updating customer Information
 * @event body
 */
module.exports = async (event) => {
  try {
    /**
     * Object contains of information from
     * customer for updating data
     *
     *
     * @type {string} id
     * @type {string} email
     * @type {string} address
     * @type {string} province
     * @type {string} region
     */
    const { id, email, address, province, region } = JSON.parse(event.body);

    /**
     * Assigning email to customerEmail variable
     * @type {string} email
     *
     * Assigning address, province, region
     * to customerAddress variable
     * @type {string} address
     * @type {string} province
     * @type {string} region
     */

    const customerEmail = { email };
    const customerAddress = { address, province, region };

    /**Putting the custoemr id to customer information collection */
    const document = firebaseDb.collection("customerInformation").doc(id);

    /**@event queryStringParameters */
    const queryString = event.queryStringParameters["parameters"];

    /**
     * Seperation from email update
     * address update
     * @type {string} queryString
     */
    switch (queryString) {
      case "email":
        customerEmail.email && (await document.update({ email: email }));
      case "address":
        customerAddress.address &&
          (await document.update({
            address: address,
            province: province,
            region: region,
          }));
    }

    return callback(200, "Successfully Updated");
  } catch (error) {
    console.log(error.message);
    callback(405, {});
  }
};
