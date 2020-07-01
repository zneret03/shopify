import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

var firebaseConfig = {
    apiKey: "AIzaSyBSxv2sBzyFw0swQsbq6G2p93qj0VnYXiI",
    authDomain: "shopify-c74df.firebaseapp.com",
    databaseURL: "https://shopify-c74df.firebaseio.com",
    projectId: "shopify-c74df",
    storageBucket: "shopify-c74df.appspot.com",
    messagingSenderId: "847872477184",
    appId: "1:847872477184:web:946b01350e1eacfe53f0e5",
    measurementId: "G-VM6QH1ETTV"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  const db = firebase.firestore();
  const auth = firebase.auth();
  
  export {db, auth}