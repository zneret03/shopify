const callback = require('../callback');
const {firebaseDb} = require('../firebaseAdmin');

/**
 * this function will handle all the changes 
 * of social media links
 * @param {*} event 
 */
module.exports = async(event) => {
    try {
        const {id, facebook, twitter, instagram} = JSON.parse(event.body);

        const document = firebaseDb.collection('user').doc(id);
        
        await document.update({
            facebook, 
            twitter,
            instagram 
        })

        return callback(200, "Successfull");
    } catch (error) {
        console.log(error.message);
    }
}