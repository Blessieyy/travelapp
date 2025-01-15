import { initializeApp } from 'firebase/app';
import { initializeAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAwmQiDUt9Jc7mR3W82l4RGBIlU6wdDbrA",
    authDomain: "weathertravel-48161.firebaseapp.com",
    projectId: "weathertravel-48161",
    storageBucket: "weathertravel-48161.firebasestorage.app",
    messagingSenderId: "626643349347",
    appId: "1:626643349347:web:4633bab6bf6accb0316d56",
    measurementId: "G-RWFTDECQPE"
};

export const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app);
export const db = getFirestore(app); // Initialize Firestore
