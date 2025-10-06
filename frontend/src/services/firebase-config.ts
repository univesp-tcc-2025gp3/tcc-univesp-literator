// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAakw_8bk4u9qEYWsoWMV9zR1k5Sd0BVwQ",
  authDomain: "literator-e1a59.firebaseapp.com",
  projectId: "literator-e1a59",
  storageBucket: "literator-e1a59.firebasestorage.app",
  messagingSenderId: "443833670973",
  appId: "1:443833670973:web:663090220350f943aff954",
  measurementId: "G-SQMQMVRL8X"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };
