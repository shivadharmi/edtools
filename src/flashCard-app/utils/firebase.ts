// Firebase App (the core Firebase SDK) is always required and must be listed first
import firebase from "firebase/app";
// If you are using v7 or any earlier version of the JS SDK, you should import firebase using namespace import
// import * as firebase from "firebase/app"

// If you enabled Analytics in your project, add the Firebase SDK for Analytics
import "firebase/analytics";

// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/firestore";
import "firebase/database";
import { removeAuthData } from "./auth";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_EDTOOLS_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_EDTOOLS_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_EDTOOLS_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_EDTOOLS_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_EDTOOLS_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_EDTOOLS_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_EDTOOLS_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_EDTOOLS_FIREBASE_MEASUREMENT_ID,
};

const App = firebase.initializeApp(firebaseConfig, "FCApp");

// Get a reference to the database service
export const firebaseDb = App.database();
export const firebaseAuth = App.auth();
firebaseAuth.onAuthStateChanged((user) => {
  if (user) {
    const userId = user.uid;
  } else {
    removeAuthData();
  }
});
