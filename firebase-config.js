// --- Your Firebase Configuration ---
// This file contains the project-specific configuration and initializes Firebase.
const firebaseConfig = {
  apiKey: "AIzaSyC_aDNfIyFcrvg1eaJlDYeil0eZqHBnbkk",
  authDomain: "rewear-44637.firebaseapp.com",
  projectId: "rewear-44637",
  storageBucket: "rewear-44637.firebasestorage.app",
  messagingSenderId: "948075010395",
  appId: "1:948075010395:web:7e24083c7c6e468a15e27e",
  measurementId: "G-TFCZ5D4VNV"
};

// --- Initialize Firebase ---
// This uses the global 'firebase' object loaded from the HTML.
// It creates the 'db' variable that script.js will use.
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore(); // Get the Firestore instance using the compatibility API
