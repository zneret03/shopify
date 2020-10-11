const callback = require("../callback");
const { firebaseDb } = require("../firebaseAdmin");

/**Getting Date */
var MyDate = new Date();

MyDate.setMonth(MyDate.getMonth() + 1);
/**setting month + 1
 * to show current month
 */

/**
 * Slicing the current month number
 * "9" = "09", "10" = "10"
 * Slicing the current date
 * "3" = "03", "11" = "11"
 * @type {string} MyDateString
 */
const MyDateString =
  MyDate.getFullYear() +
  "-" +
  ("0" + MyDate.getMonth()).slice(-2) +
  "-" +
  ("0" + MyDate.getDate()).slice(-2);

/**
 * This function will be responsible
 * for updating transaction
 * if item is pending
 * @param {object} config
 */
const onUpdateStatus = async (config) => {
  try {
    /**
     * Array Object from customer orders
     * @type {string} customerId
     * @type {Object[]} itemsIdArray
     */
    const { customerId, itemsIdArray } = config;

    /**Map through itemsIdArray
     * extract the data
     * update the current data from collection transaction
     */
    await itemsIdArray.map((item) => {
      firebaseDb
        .collection("transaction")
        .doc(item)
        .update({
          status: { color: "#00C851", itemStatus: "paid" },
          customerId: customerId,
        });
    });
  } catch (error) {
    /**
     *return 405 if function fails
     *@type {any} error
     */
    console.log(error.message);
    return callback(405, {});
  }
};

/**
 * This function will be responsible
 * setting/Adding customer checkout
 * store to the customer Information Collection
 * @event body
 */
module.exports = async (event) => {
  try {
    /**
     * @type {string} firstName
     * @type {string} lastName
     * @type {string} email
     * @type {string} address
     * @type {number} total
     * @type {string} activeRegion
     * @type {string} province
     * @type {string} zipcode
     * @type {Array} pending
     */
    const {
      firstName,
      lastName,
      email,
      address,
      total,
      activeRegion,
      province,
      zipcode,
      pending,
    } = JSON.parse(event.body);

    /**
     * Converting total to number
     * @type {number} totalSales
     */
    const totalSales = Number(total);

    /**Creating variable array
     * itemsIdArray for extracting all items id
     * ownerIdArray for extracting owners id
     */
    const itemsIdArray = [];
    const ownerIdArray = [];

    /**Map through pending
     * push the data to itemsIdArray and ownersIdArray
     * @type {Array} pending
     */
    pending.map((item) => {
      itemsIdArray.push(item.id);
      ownerIdArray.push({ id: item.uid });
    });

    const document = firebaseDb.collection("customerInformation").doc();

    /**
     * Setting/Adding data gathered
     * to customerInformation collection
     */
    await document
      .set({
        firstName: firstName,
        lastName: lastName,
        email: email,
        address: address,
        subTotal: totalSales,
        region: activeRegion,
        province: province,
        zipcode: zipcode,
        items: itemsIdArray,
        uid: ownerIdArray,
        date_created: MyDateString,
        timestamp: Date.now(),
      })
      .then(async () => {
        /**
         * passing arguments to onUpdateStatus
         * @type {string} customerId
         * @type {Array} itemsIdArray
         */
        const config = { customerId: document.id, itemsIdArray };
        await onUpdateStatus(config);
      });

    /**Return message "Successfully inserted"*/
    return callback(200, "Successfull inserted");
  } catch (error) {
    /**Hence return 405 for function fails
     * @type {any} error message
     */
    console.log(error.message);
    return callback(405, {});
  }
};
