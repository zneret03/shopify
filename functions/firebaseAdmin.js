const admin = require("firebase-admin");
const serviceAccounts = require('./keys/permissions.json');
require("dotenv");

/**
 * This will handle all the firebase config
 * it will be necessary
 * reusable
 */

admin.initializeApp({
  credential: admin.credential.cert(serviceAccounts),
  databaseURL: process.env.FIREBASE_DATABASE_URL,
});

/**Assigning firestore functions to firebaseDb
 * reusable purposes
 */
const firebaseDb = admin.firestore();
const firebaseAuth = admin.auth();
firebaseDb.settings({ timestampsInSnapshots: true });

/**export firebaseDb variable */
module.exports = { firebaseDb, firebaseAuth };
