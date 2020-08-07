import {functions} from './middleware/middleware'
import {signIn} from './api/SignIn';
import {addProduct, getProduct, updateProduct, deleteProducts, cart} from './api/products';

exports.signIn = functions.https.onRequest(signIn);
exports.cart = functions.https.onRequest(cart);
exports.addProduct = functions.https.onRequest(addProduct);
exports.getProduct = functions.https.onRequest(getProduct);
exports.updateProduct = functions.https.onRequest(updateProduct);
exports.deleteProducts = functions.https.onRequest(deleteProducts);