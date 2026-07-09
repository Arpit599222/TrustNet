import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC51bp_5lurPqXxbtF83oiG1pBZJIgcgto",
  authDomain: "aitrade-a2f4a.firebaseapp.com",
  projectId: "aitrade-a2f4a",
  storageBucket: "aitrade-a2f4a.firebasestorage.app",
  messagingSenderId: "337435104965",
  appId: "1:337435104965:web:1ae2df3c71c93fa6ad42ac",
  measurementId: "G-5V8FQPG36T"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
