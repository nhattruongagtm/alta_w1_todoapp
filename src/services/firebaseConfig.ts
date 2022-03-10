import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyATalTbcdD2T68UhHcSg56vnVhsXd6g_Dk",
  authDomain: "altatodoapp.firebaseapp.com",
  projectId: "altatodoapp",
  storageBucket: "altatodoapp.appspot.com",
  messagingSenderId: "642109362878",
  appId: "1:642109362878:web:1b2d8d49c25e11244f04ef",
  measurementId: "G-RVC5Y8RES1",
};

// Khởi tạo Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export default db;
