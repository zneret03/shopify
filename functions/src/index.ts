const functions = require('firebase-functions');
const admin = require('firebase-admin');
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
var serviceAccount = require('../lib/permissions.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://shopify-c74df.firebaseio.com"
});

const app = express();
app.use(express.urlencoded({ extended : true }));
app.use(express.json());
app.use(cors({origin : true}));
app.use(cookieParser());

app.get('/items', (request : any, response : any) => {
    return response.send('Hello world');
});

exports.app = functions.https.onRequest(app);