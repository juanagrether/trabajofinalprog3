import app from 'firebase/app';
import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyC52IpqdL1CMcjD_plnemCS1UCueicOzsc",
    authDomain: "trabajofinalprog3.firebaseapp.com",
    projectId: "trabajofinalprog3",
    storageBucket: "trabajofinalprog3.firebasestorage.app",
    messagingSenderId: "645473881199",
    appId: "1:645473881199:web:ca3d2884e45d791968519a"
  };

app.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const storage = app.storage();
export const db = app.firestore();
