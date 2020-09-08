const {firebaseDb} = require('../firebaseAdmin');
const callback = require('../callback');

module.exports = async(event) => {
    try {
        const id = event.queryStringParameters['productId'];
        if(id){
            const document = firebaseDb.collection('product').doc(id);
            await document.delete();
            return callback(200, "Successfully Deleted");
        }
    } catch (error) {
        console.log(error.message);
        return callback(405, {});
    }
}