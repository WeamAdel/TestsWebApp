import firebase from "firebase/app";
import database from "firebase/database";

export const firebaseConfig = {
  apiKey: "AIzaSyDmoM405gtzCzG5nTHLJ5ffWg2tBNRp6Ug",
  authDomain: "testswebapp-af51f.firebaseapp.com",
  databaseURL: "https://testswebapp-af51f-default-rtdb.firebaseio.com",
  projectId: "testswebapp-af51f",
  storageBucket: "testswebapp-af51f.appspot.com",
  messagingSenderId: "862702560579",
  appId: "1:862702560579:web:c1826503fbd6ae7fecbbf6",
  measurementId: "G-R8DJBH2Z7W",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase;
