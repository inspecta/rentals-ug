// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAeBhNjZM-1iWvZKcXnSf56y5KA0gv-Mvw",
  authDomain: "rentals-ug-addd7.firebaseapp.com",
  projectId: "rentals-ug-addd7",
  storageBucket: "rentals-ug-addd7.appspot.com",
  messagingSenderId: "404357235349",
  appId: "1:404357235349:web:ca04445d16ffbb6dfe119c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);