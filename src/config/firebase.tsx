import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

// const {
//   REACT_APP_FIREBASE_KEY,
//   REACT_APP_FIREBASE_DOMAIN,
//   REACT_APP_FIREBASE_DATABASE,
//   REACT_APP_FIREBASE_PROJECT_ID,
//   REACT_APP_FIREBASE_STORAGE_BUCKET,
//   REACT_APP_FIREBASE_SENDER_ID,
//   REACT_APP_FIREBASE_APP_ID,
//   REACT_APP_FIREBASE_MEASUREMENT_ID,
// } = process.env;

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
const app = firebase.initializeApp(firebaseConfig);

const provider = {
  facebook: new firebase.auth.FacebookAuthProvider(),
  google: new firebase.auth.GoogleAuthProvider(),
  github: new firebase.auth.GithubAuthProvider(),
};

export { app, provider };
