// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCBfY9uYE_-F6ZVi5EGEb70CWOGw_zdEnA",
  authDomain: "redlight-app.firebaseapp.com",
  projectId: "redlight-app",
  storageBucket: "redlight-app.appspot.com",
  messagingSenderId: "1057860549093",
  appId: "1:1057860549093:web:f7e0994c15e2002cd0170c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getFirestore(app)

export {auth, db}