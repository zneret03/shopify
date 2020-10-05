const { firebaseDb } = require("../firebaseAdmin");
const callback = require("../callback");

var MyDate = new Date();

MyDate.setMonth(MyDate.getMonth() + 1);

const MyDateString =
  MyDate.getFullYear() +
  "-" +
  ("0" + MyDate.getMonth()).slice(-2) +
  "-" +
  ("0" + MyDate.getDate()).slice(-2);

const onSubtractQuantity = async (config) => {
  try {
    const { Totalquantity, productId } = config;
    const document = firebaseDb.collection("product").doc(productId);
    const getValue = await document.get();

    if (getValue) {
      const newQuantity = getValue.data().quantity - Totalquantity;
      await document.update({
        quantity: newQuantity,
      });
    }
  } catch (error) {
    console.log(error.message);
    return callback(500, {});
  }
};

module.exports = async (event) => {
  try {
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

    const subtotal = Number(Subtotal);
    const vatable = Number(vat);
    const quantity = Number(Totalquantity);
    const document = firebaseDb.collection("transaction").doc();

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
        status: { color: status, itemStatus: "pending" },
      })
      .then(() => {
        const config = { Totalquantity, productId };
        onSubtractQuantity(config);
      });

    return callback(200, "Successfully added to cart");
  } catch (error) {
    console.log(error.message);
    return callback(405, {});
  }
};
