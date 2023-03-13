// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyASZ3QZWvfms7UwiHdYCD5db9qI398v4Nw",
  authDomain: "authentication-system-24736.firebaseapp.com",
  projectId: "authentication-system-24736",
  storageBucket: "authentication-system-24736.appspot.com",
  messagingSenderId: "422518292962",
  appId: "1:422518292962:web:a9ffb92e6e71a2350279bb"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);