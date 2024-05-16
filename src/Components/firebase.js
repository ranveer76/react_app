// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
const firebaseConfig = {
  apiKey: "AIzaSyC3SBz_xx9SUHTqhKAkhN49DTF9AfInPic",
  authDomain: "login-auth-f85db.firebaseapp.com",
  projectId: "login-auth-f85db",
  storageBucket: "login-auth-f85db.appspot.com",
  messagingSenderId: "219061608413",
  appId: "1:219061608413:web:e99dc05f10478ce4822034",
  measurementId: "G-2Z5DEBX4LN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);

export const auth = getAuth();
export const database = getDatabase();
export default app;