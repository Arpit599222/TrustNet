import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
<<<<<<< HEAD
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
=======
  apiKey: "AIzaSyC51bp_5lurPqXxbtF83oiG1pBZJIgcgto",
  authDomain: "aitrade-a2f4a.firebaseapp.com",
  projectId: "aitrade-a2f4a",
  storageBucket: "aitrade-a2f4a.firebasestorage.app",
  messagingSenderId: "337435104965",
  appId: "1:337435104965:web:1ae2df3c71c93fa6ad42ac",
  measurementId: "G-5V8FQPG36T"
>>>>>>> 3f522f46122cfb12256c8732364c9c1958aa4548
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
