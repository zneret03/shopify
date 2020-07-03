const functions = require('firebase-functions');
const admin = require('firebase-admin');
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const serviceAccount = require('../lib/permissions.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://shopify-c74df.firebaseio.com"
});


const db = admin.firestore();
const auth = admin.auth();


const app = express();
app.use(express.urlencoded({ extended : true }));
app.use(express.json());
app.use(cors({origin : true}));
app.use(cookieParser());

//signIn endpoint
app.post('/signIn', async(request : any, response : any) => {
    return await db.collection('user').doc(request.body.id).create({
        id: request.body.id,
        email : request.body.email,
        firstname : request.body.firstname,
        lastname : request.body.lastname
    }).then(() => {
      console.log('successfully inserted')
    })
    .catch((error : any) => {
      return response.status(500).send(error.message)
    });
});


exports.app = functions.https.onRequest(app);