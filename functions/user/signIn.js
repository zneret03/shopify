const { firebaseDb } = require("../firebaseAdmin");
const callback = require("../callback");

/**
 * This function will receive
 * all the information from register
 * and save to the cloud
 * @param {Object} event
 */

module.exports = async (event) => {
  try {
    const { id, email, firstname, lastname, city, state, zipcode } = JSON.parse(event.body);
    const document = firebaseDb.collection("user").doc(id);
    document.set({ 
      id, 
      email, 
      firstname, 
      lastname, 
      city, 
      state, 
      zipcode, 
      facebook : "", 
      twitter : "", 
      instagram : ""  
    });
    return callback(200, "User created successfully");
  } catch (error) {
    console.log(error.message);
    return callback(405, {});
  }
};
