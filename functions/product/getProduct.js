const {firebaseDb} = require('../firebaseAdmin');
const callback = require('../callback');

module.exports = async(event) => {
    try {
        const productArray = [];

        const document = firebaseDb.collection('transaction');

        const productData = await document.get();

        productData.docs.map((items) => {
            const data = {
                subtotal : items.data().Subtotal,
                Totalquantity : items.data().Totalquantity,
                customerInformation : items.data().customerInformation,
                gender : items.data().gender,
                imageUrl : items.data().imageUrl,
                productId : items.data().productId,
                productName : items.data().productName,
                purpose : items.data().purpose,
                size : items.data().size,
                status : items.data().status
            }
            productArray.push(data);
        });

        console.log(productArray);

        return callback(200, {productArray});

    } catch (error) {
        console.log(error.message);
        return callback(405,{});
    }
}