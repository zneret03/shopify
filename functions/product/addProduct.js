const {firebaseDb} = require('../firebaseAdmin');
const callback = require('../callback');

module.exports = async(event) => {
    try {
        const {
            uid, 
            fileName, 
            product, 
            title, 
            purpose, 
            price, 
            quantity, 
            imageUrl, 
            date, 
            gender, 
            description, 
            size} = JSON.parse(event.body);
            
         await firebaseDb.collection('product').add({
            uid, 
            fileName, 
            product, 
            title, 
            purpose, 
            price, 
            quantity, 
            imageUrl, 
            date, 
            gender, 
            description, 
            size
        });

        return callback(200, "Successfully Inserted");

    } catch (error) {
        console.log(error.message);
        return callback(405,{})
    }
}