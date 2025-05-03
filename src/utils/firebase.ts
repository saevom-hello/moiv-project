import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCcdzNbUH1g-dyqjxKJLvUrZt4sW_DAqJ8",
  authDomain: "moivv-e9df0.firebaseapp.com",
  projectId: "moivv-e9df0",
  storageBucket: "moivv-e9df0.firebasestorage.app",
  messagingSenderId: "348683357095",
  appId: "1:348683357095:web:06754493b6a12c4c7dc482",
  measurementId: "G-SWZ47W5CL9"
};

const app = initializeApp(firebaseConfig);
const analytics = typeof window !== "undefined" ? getAnalytics(app) : null;

// ✅ 지역 명시 추가
const db = getFirestore(app);

export { db };
