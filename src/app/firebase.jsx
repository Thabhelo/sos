// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBF78Ou7aS7mDriuMoW4ydKIfG1O3gNacE",
  authDomain: "sos-ett.firebaseapp.com",
  projectId: "sos-ett",
  storageBucket: "sos-ett.appspot.com",
  messagingSenderId: "86838142122",
  appId: "1:86838142122:web:8bcb1910cb460d673a5cd3",
  measurementId: "G-4QZWC20PZS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication
const auth = getAuth(app);

export const signUp = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };
  
  export const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };
  
export { auth };
