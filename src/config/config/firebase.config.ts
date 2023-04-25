import { initializeApp } from 'firebase/app';

const firebaseConfig = {
    apiKey: "AIzaSyBIOSMIJVR0TmBapX3flU0Lmc5HpL3bh_g",
    authDomain: "hospital-4a35b.firebaseapp.com",
    projectId: "hospital-4a35b",
    storageBucket: "hospital-4a35b.appspot.com",
    messagingSenderId: "529599994335",
    appId: "1:529599994335:web:73e74392660b1334620c6a",
    measurementId: "G-EMN5T0C9FF",
};

const app = initializeApp(firebaseConfig);

export default app;