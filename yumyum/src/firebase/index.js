import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB2be5rZ9bkRKnnrmniCKceW7hASSR3u3Y",
  authDomain: "summativegrade12-eeb24.firebaseapp.com",
  projectId: "summativegrade12-eeb24",
  storageBucket: "summativegrade12-eeb24.appspot.com",
  messagingSenderId: "716986285888",
  appId: "1:716986285888:web:c5a51f4ab2c8a7226584a5"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const firestore = getFirestore(app);