import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAeP02lZ249WhHvLqFr9u-uVqFtynX0dak",
  authDomain: "sampsonstraveljournal.firebaseapp.com",
  projectId: "sampsonstraveljournal",
  storageBucket: "sampsonstraveljournal.firebasestorage.app",
  messagingSenderId: "84221473095",
  appId: "1:84221473095:web:f8c4cd478d7dd3da0e5c62"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);