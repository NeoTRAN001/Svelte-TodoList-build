import firebase from 'firebase/app'; // Install npm i --save firebase
import 'firebase/firestore';
// Your web app's Firebase configuration
 var firebaseConfig = {
    apiKey: "AIzaSyBUNM-pxVyYFAnBtMZFOcO7uMtfGlEqMfA",
    authDomain: "todolist-ironbit.firebaseapp.com",
    databaseURL: "https://todolist-ironbit.firebaseio.com",
    projectId: "todolist-ironbit",
    storageBucket: "todolist-ironbit.appspot.com",
    messagingSenderId: "229730981640",
    appId: "1:229730981640:web:bb8ad0b66299b865f17ebd"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export const db = firebase.firestore(); // Init address connection with firebase