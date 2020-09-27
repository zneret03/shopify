const callback = require("../callback");
const { firebaseDb } = require("../firebaseAdmin");

const onUpdateStatus = async (config) => {
  try {
    const { customerId, itemsIdArray } = config;

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
    console.log(error.message);
    return callback(405, {});
  }
};

module.exports = async (event) => {
  try {
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
    const totalSales = Number(total);

    const itemsIdArray = [];
    const ownerIdArray = [];

    pending.map((item) => {
      itemsIdArray.push(item.id);
      ownerIdArray.push({ id: item.uid });
    });

    const document = firebaseDb.collection("customerInformation").doc();

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
      })
      .then(async () => {
        const config = { customerId: document.id, itemsIdArray };
        await onUpdateStatus(config);
      });

    return callback(200, "Syccessfull");
  } catch (error) {
    console.log(error.message);
    return callback(405, {});
  }
};
