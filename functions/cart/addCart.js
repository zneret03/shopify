const { firebaseDb } = require("../firebaseAdmin");
const callback = require("../callback");

/**Getting Date */
var MyDate = new Date();
/**setting month + 1
 * to show current month
 */
MyDate.setMonth(MyDate.getMonth() + 1);

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
 * for subtracting quantity
 * to the product collection
 * @param {object} config
 */
const onSubtractQuantity = async (config) => {
  try {
    /**
     * @type {number} Totalquantity
     * @type {string} productId
     */
    const { Totalquantity, productId } = config;
    const document = firebaseDb.collection("product").doc(productId);

    /**awaiting to product data */
    const getValue = await document.get();

    /**If getValue aren't empty then execute the following */
    if (getValue) {
      /**
       * This will be responsible on subtrating
       * thte quantity to product collection
       * @type {number} newQuantity
       */
      const newQuantity = getValue.data().quantity - Totalquantity;

      /**Update to newQuantity in product collection */
      await document.update({
        quantity: newQuantity,
      });
    }
  } catch (error) {
    /**Return error if server fails */
    console.log(error.message);
    return callback(500, {});
  }
};

/**
 * This function will be responsible
 * for Setting/Adding product data to transaction
 * @event body
 */
module.exports = async (event) => {
  try {
    /**
     * set of product information bundle in an object
     * @type {string} uid
     * @type {string} productId
     * @type {string} size
     * @type {string} title
     * @type {string} category
     * @type {string} imageUrl
     * @type {string} purpose
     * @type {string} productName
     * @type {number} Subtotal
     * @type {number} vat
     * @type {number} Totalquantity
     * @type {string} gender
     * @type {string} status
     */
    const {
      uid,
      productId,
      size,
      title,
      category,
      imageUrl,
      purpose,
      productName,
      Subtotal,
      vat,
      Totalquantity,
      gender,
      status,
    } = JSON.parse(event.body);

    /**
     * converting Subtotal, vatable, quantity to number
     * @type {number} subtotal
     * @type {number} vatable
     * @type {number} quantity
     */
    const subtotal = Number(Subtotal);
    const vatable = Number(vat);
    const quantity = Number(Totalquantity);
    const document = firebaseDb.collection("transaction").doc();

    /**Setting/Adding all the information gathered into cloud */
    await document
      .set({
        uid: uid,
        productId: productId,
        size: size,
        title: title,
        category: category,
        imageUrl: imageUrl,
        purpose: purpose,
        product: productName,
        Subtotal: subtotal,
        valueAddedTax: vatable,
        quantity: quantity,
        gender: gender,
        date_created: MyDateString,
        timestamp: Date.now(),
        status: { color: status, itemStatus: "pending" },
      })
      .then(() => {
        /**Assigning Totalquantity and productId to
         * OnSubtractQuantity function
         * @type {number} Totalquantity
         * @type {string} productId
         */
        const config = { Totalquantity, productId };
        onSubtractQuantity(config);
      });

    /**Return "Successfully added to cart" if success */
    return callback(200, "Successfully added to cart");
  } catch (error) {
    /**Hence return 405 for function fails
     * @type {any} error message
     */
    console.log(error.message);
    return callback(405, {});
  }
};
