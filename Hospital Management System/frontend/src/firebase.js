// Import the functions you need from the SDKs you need
import firebase,{ initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// const firebaseConfig = {
const firebaseConfig = {
  apiKey: "AIzaSyDz7G3pD58ztVMQDlsIDwKFnex-D9Ev4_k",
  authDomain: "react-dd4f4.firebaseapp.com",
  projectId: "react-dd4f4",
  storageBucket: "react-dd4f4.appspot.com",
  messagingSenderId: "8453691053",
  appId: "1:8453691053:web:17344956c2a61ec2d79824"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export {auth,app};