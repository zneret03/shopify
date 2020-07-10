import {functions,  } from './middleware/middleware'
import {signIn} from './api/SignIn';
import {addProduct, getProduct} from './api/products';

exports.signIn = functions.https.onRequest(signIn);
exports.addProduct = functions.https.onRequest(addProduct);
exports.getProduct = functions.https.onRequest(getProduct);