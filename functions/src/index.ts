import {functions, db} from './middleware/middleware'
import {signIn} from './api/SignIn';
import {addProduct, getProduct, updateProduct, deleteProducts, cart} from './api/products';
import {checkOut} from './api/checkOut';

exports.signIn = functions.https.onRequest(signIn);
exports.cart = functions.https.onRequest(cart);
exports.addProduct = functions.https.onRequest(addProduct);
exports.getProduct = functions.https.onRequest(getProduct);
exports.updateProduct = functions.https.onRequest(updateProduct);
exports.deleteProducts = functions.https.onRequest(deleteProducts);
exports.checkOut = functions.https.onRequest(checkOut);

exports.onTransactCreate = functions.firestore.document('transaction/{transactionId}').onCreate(async(snap : any, context : any)=> {
    const Data = snap.data();

    return await Data.itemsCheckout.map((item : any) => {
        db.collection('Cart').doc(item.id).update({
            status : '#00C851'
        })
    })
//    return await db.collection('hi').doc().set({
//         firstName : Data.firstName
//     });
});

