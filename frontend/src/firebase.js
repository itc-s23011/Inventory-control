import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBZdD63Hg2QLoM0DRXWNu8dQNBviR2k4ws",
    authDomain: "inventory-control-8b923.firebaseapp.com",
    projectId: "inventory-control-8b923",
    storageBucket: "inventory-control-8b923.appspot.com",
    messagingSenderId: "872369829514",
    appId: "1:872369829514:web:7a284a3e4f7df3efbe1f73",
    measurementId: "G-PM34PJY0RW"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };