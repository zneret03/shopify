const callback = require('../callback');
const {firebaseDb} = require('../firebaseAdmin');

/**
 * this function will handle all the image updated by the user
 * @event Body
 */
module.exports = async(event) => {
    try {
        const {id, imageUrl} = JSON.parse(event.body);
        const document = firebaseDb.collection('user').doc(id);

        await document.update({imageUrl})

        return callback(200, "Successfully");
    } catch (error) {
        console.log(error.message);
        return callback(405, {});
    }
}   