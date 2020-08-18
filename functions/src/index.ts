import {functions, db} from './middleware/middleware'
import {signIn} from './api/SignIn';
import {addProduct, getProduct, updateProduct, deleteProducts, cart} from './api/products';
import {checkOut, getTransaction} from './api/checkOut';

//Firestore triggers
exports.onTransactCreate = functions.firestore.document('transaction/{transactionId}').onCreate(async(snap : any, context : any)=> {
    const Data = snap.data();

    await Data.itemsCheckout.map((item : any) => {
        db.collection('Cart').doc(item.id).update({
            status : '#00C851'
        })
    })
});

exports.onCartUpdate = functions.firestore.document('Cart/{CartId}').onUpdate(async(changes : any, context : any) => {
    const newValue = changes.after.data();
    const previousValue = changes.before.data();

    let updatePromise : any[] = [];

    if(newValue.status !== previousValue.status){
        const snapshot = await db.collection('transaction').get();

        snapshot.docs.map((item : any) => {
            updatePromise.push(db.collection('transaction').doc(item.id).update({itemsCheckout : [{status : '#00C851'}]}))
        });
    }

    await Promise.all(updatePromise);
});

exports.signIn = functions.https.onRequest(signIn);
exports.cart = functions.https.onRequest(cart);
exports.addProduct = functions.https.onRequest(addProduct);
exports.getProduct = functions.https.onRequest(getProduct);
exports.updateProduct = functions.https.onRequest(updateProduct);
exports.deleteProducts = functions.https.onRequest(deleteProducts);
exports.checkOut = functions.https.onRequest(checkOut);


