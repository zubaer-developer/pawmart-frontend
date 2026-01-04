import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB-X18JgEqOCMRRfDenwjqoksb7XDd0xPA",
  authDomain: "blood-donation-platform-43f5b.firebaseapp.com",
  projectId: "blood-donation-platform-43f5b",
  storageBucket: "blood-donation-platform-43f5b.firebasestorage.app",
  messagingSenderId: "931419905176",
  appId: "1:931419905176:web:6aeeb0dc9d42f22d62c4ed",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default auth;
