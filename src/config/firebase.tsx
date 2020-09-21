import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const {
  REACT_APP_FIREBASE_KEY,
  REACT_APP_FIREBASE_DOMAIN,
  REACT_APP_FIREBASE_DATABASE,
  REACT_APP_FIREBASE_PROJECT_ID,
  REACT_APP_FIREBASE_STORAGE_BUCKET,
  REACT_APP_FIREBASE_SENDER_ID,
  REACT_APP_FIREBASE_APP_ID,
  REACT_APP_FIREBASE_MEASUREMENT_ID,
} = process.env;

var firebaseConfig = {
  apiKey: REACT_APP_FIREBASE_KEY,
  authDomain: REACT_APP_FIREBASE_DOMAIN,
  databaseURL: REACT_APP_FIREBASE_DATABASE,
  projectId: REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: REACT_APP_FIREBASE_SENDER_ID,
  appId: REACT_APP_FIREBASE_APP_ID,
  measurementId: REACT_APP_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

const provider = {
  facebook: new firebase.auth.FacebookAuthProvider(),
  google: new firebase.auth.GoogleAuthProvider(),
  github: new firebase.auth.GithubAuthProvider(),
};

export { app, provider };
