import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/storage";
var firebaseConfig = {
    apiKey: "AIzaSyAmhjoR8gInYkTgPR8mAPT9mf8kONjdpuY",
    authDomain: "react-slack-clone-87b2a.firebaseapp.com",
    databaseURL: "https://react-slack-clone-87b2a.firebaseio.com",
    projectId: "react-slack-clone-87b2a",
    storageBucket: "react-slack-clone-87b2a.appspot.com",
    messagingSenderId: "686984514877",
    appId: "1:686984514877:web:63bcb1099f64e3df14c954"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export default firebase