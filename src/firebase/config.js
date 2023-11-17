import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCzyBZwWPqIWF0GIVrtcVhJQbUWJkpt_Zo",
  authDomain: "login-1487d.firebaseapp.com",
  projectId: "login-1487d",
  storageBucket: "login-1487d.appspot.com",
  messagingSenderId: "941837050075",
  appId: "1:941837050075:web:9d693adf98b365c4d1ecfe",
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export default auth;
