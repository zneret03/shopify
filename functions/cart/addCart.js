const {firebaseDb} = require('../firebaseAdmin');
const callback = require('../callback');

const onSubtractQuantity = async(config) => {
    try {
        const {Totalquantity, productId } = config;
        const document = firebaseDb.collection('product').doc(productId);
        const getValue = await document.get();

        if(getValue){
            const newQuantity = getValue.data().quantity - Totalquantity;
            await document.update({
                quantity : newQuantity
            });
        }

    } catch (error) {
        console.log(error.message);
        return callback(500, {});
    }
}

module.exports = async(event) => {
    try {
        const {
            uid,
            productId, 
            size, 
            imageUrl, 
            purpose, 
            productName,
            Subtotal, 
            Totalquantity,
            gender,
            status
        } = JSON.parse(event.body);

        const total = Number(Subtotal);
        const quantity = Number(Totalquantity);

        const document = firebaseDb.collection('transaction').doc();

        await document.set({
            uid : uid,
            productId : productId,
            size : size,
            imageUrl : imageUrl,
            purpose : purpose,
            product : productName,
            Subtotal : total,
            quantity : quantity,
            gender : gender,
            status : {color : status, itemStatus : 'pending'}
        }).then(() => {
            const config = {Totalquantity, productId};
            onSubtractQuantity(config);
        })

        return callback(200, "Successfully added to cart");

    } catch (error) {
        console.log(error.message);
        return callback(405, {});
    }
}