import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/database";
if (!firebase.apps.length) {
   firebase.initializeApp({
      apiKey: "AIzaSyBs9yo6gYNXxVHGae1ItQEHOJFBwInzPBs",
      authDomain: "react-chat-f1a4f.firebaseapp.com",
      projectId: "react-chat-f1a4f",
      storageBucket: "react-chat-f1a4f.appspot.com",
      messagingSenderId: "437149493050",
      appId: "1:437149493050:web:6ff9bad80648c1e11b9203",
      measurementId: "G-1L10RX1ME6",
   });
}
export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const db = firebase.database();
