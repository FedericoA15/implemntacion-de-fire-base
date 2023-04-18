const admin = require("firebase-admin");
const firestore = admin.firestore;
const initializeApp = admin.initializeApp;

const firebaseConfig = {
  apiKey: "AIzaSyBBM3eNpLREVGTQVYnR1wRk8IsOi1t3O8k",
  authDomain: "pruebadedatabase.firebaseapp.com",
  projectId: "pruebadedatabase",
  storageBucket: "pruebadedatabase.appspot.com",
  messagingSenderId: "413100398306",
  appId: "1:413100398306:web:1a7761e119bdff188070bb",
  measurementId: "G-70E82D24LT",
};

initializeApp(firebaseConfig);
const db = firestore();
const User = db.collection("Users");
module.exports = User;
