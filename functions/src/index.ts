import {functions, db} from './middleware/middleware'
import {signIn} from './api/SignIn';
import {addProduct, getProduct, updateProduct, deleteProducts, cart} from './api/products';
import {checkOut} from './api/checkOut';

//Firestore triggers
exports.onTransactCreate = functions.firestore.document('customerInformation/{customerInformationId}').onCreate(async(snap : any, context : any)=> {
    const value = snap.data();

    await value.items.map((item : any) => {
        db.collection('transaction').doc(item).update({
            status : {color : '#00C851', itemStatus : 'paid'},
            customerInformation : { 
                customerName : `${value.firstName} ${value.lastName}`,
                customerEmail : value.email
            },
        });
    })
});


exports.signIn = functions.https.onRequest(signIn);
exports.cart = functions.https.onRequest(cart);
exports.addProduct = functions.https.onRequest(addProduct);
exports.getProduct = functions.https.onRequest(getProduct);
exports.updateProduct = functions.https.onRequest(updateProduct);
exports.deleteProducts = functions.https.onRequest(deleteProducts);
exports.checkOut = functions.https.onRequest(checkOut);


