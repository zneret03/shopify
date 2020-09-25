const { firebaseDb } = require("../firebaseAdmin");
const callback = require("../callback");

module.exports = async (event) => {
  try {
    const { id, email, address, province, region } = JSON.parse(event.body);

    const customerEmail = { email };
    const customerAddress = { address, province, region };
    const document = firebaseDb.collection("customerInformation").doc(id);

    const queryString = event.queryStringParameters["parameters"];

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
