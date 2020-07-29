import { request } from "express";

export const functions = require('firebase-functions');
export const admin = require('firebase-admin');
const serviceAccount = require('../../lib/permissions.json');
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://shopify-c74df.firebaseio.com"
});

export const db = admin.firestore();
export const app = express();

// app.use((request : any, response : any, next: any) => {
//     response.header("Access-Control-Allow-Origin", "true"); // update to match the domain you will make the request from
//     response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
// })

app.use(express.urlencoded({ extended : true }));
app.use(express.json());
app.use
app.use(cors({origin : true}));
app.use(cookieParser());
