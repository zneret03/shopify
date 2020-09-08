const {firebaseDb} = require('../firebaseAdmin');
const callback = require('../callback');

module.exports = async(event) => {
    try {
        const {product, title, purpose, price, quantity, gender, description} = JSON.parse(event.body);
        let productPrice = Number(price);
        let productQuantity = Number(quantity);
        const productId = event.queryStringParameters['productId'];

        const document = firebaseDb.collection('product').doc(productId);

        await document.update({
            product : product,
            title : title,
            purpose : purpose,
            price : productPrice,                                       
            quantity : productQuantity,
            gender : gender,
            description : description
        });   

        return callback(200, "Product Updated Successfully");
    } catch (error) {
        console.log(error.message);
        return callback(405, {});
    }
}