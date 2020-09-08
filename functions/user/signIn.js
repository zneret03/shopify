const {firebaseDb} = require('../firebaseAdmin');
const callback = require('../callback');

module.exports = async(event) => {
    try {
         const {id, email, firstname, lastname} = JSON.parse(event.body);
         const document = firebaseDb.collection('user').doc(id);
         document.set({id, email, firstname, lastname});
         return callback(200, "User created successfully")
    } catch (error) {
        console.log(error.message);
        return callback(405, {});
    }
}