const admin = require('firebase-admin');
const serviceAccounts = require('../keys/permissions.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccounts),
    databaseURL: "https://shopify-c74df.firebaseio.com"
});

const firebaseDb = admin.firestore();
firebaseDb.settings({timestampsInSnapshots : true});

module.exports = {firebaseDb}
