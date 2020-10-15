const callback = require("../callback");
const { firebaseDb } = require("../firebaseAdmin");

/**
 *This module will add a data to the firestore cloud
 * @event body
 * @type {object} ACTION
 */

const ACTION = {
  add: "add",
  remove: "remove",
};

/**
 * This function will determine if it needs to add
 * quantity or remove quantity
 * @param {any} config
 */
const quantityAdjustment = async (config) => {
  try {
    /**
     * destructuring objects
     * @type {string} action
     * @type {string} qty
     * @type {string} id
     */
    const { action, qty, id } = config;

    /**Assigning id to the product collection */
    const document = firebaseDb.collection("product").doc(id);

    /**get all data from product collection */
    const getValue = await document.get();

    /**
     * if action isEqual(add) add quantity
     * if action isEqual(remove) remove quantity
     */

    const quantity = Number(qty);

    if (action === ACTION.add) {
      document.update({
        quantity: getValue.data().quantity + quantity,
      });
    }

    if (action === ACTION.remove) {
      document.update({
        quantity: getValue.data().quantity - quantity,
      });
    }
  } catch (error) {
    /**Return error if server fails */
    console.group(error.message);
    return callback(405, {});
  }
};

module.exports = async (event) => {
  try {
    /**
     * @type {string} uid
     * @type {string} id
     * @type {string} remarks
     * @type {string} action
     * @type {string} qty
     * @type {string} date_created
     * @type {string} description
     */
    const {
      uid,
      id,
      remarks,
      action,
      qty,
      date_created,
      description,
    } = JSON.parse(event.body);

    /**Making new collection called StockAdjustment */
    const document = firebaseDb.collection("StockAdjustment").doc();

    /**
     * Setting data into documents of StockAdjustment collection
     * Saving user uid to make references
     * Saving product id to make references for future purposes
     * */
    await document
      .set({
        uid: uid,
        id: id,
        quantity: qty,
        remarks: remarks,
        action: action,
        date_created: date_created,
        description: description,
      })
      .then(() => {
        const config = { action, qty, id };
        quantityAdjustment(config);
      });

    return callback(200, "Successfully");
  } catch (error) {
    /**Return error if server fails */
    console.log(error.message);
    return callback(405, {});
  }
};
