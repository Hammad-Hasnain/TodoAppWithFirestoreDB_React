// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";



// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCMXlB2fmUSP3HEpSUE2kUDyY3KbHjrR-w",
    authDomain: "to-do-app-7edb8.firebaseapp.com",
    databaseURL: "https://to-do-app-7edb8-default-rtdb.firebaseio.com",
    projectId: "to-do-app-7edb8",
    storageBucket: "to-do-app-7edb8.appspot.com",
    messagingSenderId: "644516930741",
    appId: "1:644516930741:web:c3e7c80f18d922f45a8afc"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

// Initialize Authentication
const auth = getAuth()

export { db, auth }