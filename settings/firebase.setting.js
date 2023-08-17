// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
import { initializeApp,getApp,getApps } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCsHE_KPrX8B6NmlX4oRo8A7NeW56fozxM",
  authDomain: "facepal-c0e4e.firebaseapp.com",
  projectId: "facepal-c0e4e",
  storageBucket: "facepal-c0e4e.appspot.com",
  messagingSenderId: "205455310577",
  appId: "1:205455310577:web:b96fb3a94e43687ec23350"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
// const app = initializeApp(firebaseConfig);
const authentication = getAuth(app);
const db = getFirestore(app);

export { authentication,db }