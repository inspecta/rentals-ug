import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAeBhNjZM-1iWvZKcXnSf56y5KA0gv-Mvw',
  authDomain: 'rentals-ug-addd7.firebaseapp.com',
  projectId: 'rentals-ug-addd7',
  storageBucket: 'rentals-ug-addd7.appspot.com',
  messagingSenderId: '404357235349',
  appId: '1:404357235349:web:ca04445d16ffbb6dfe119c',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
// export default db;

export { auth, db };
