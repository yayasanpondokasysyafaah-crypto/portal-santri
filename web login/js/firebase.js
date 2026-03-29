import { initializeApp } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyB-MOsJObrnD_kgZE7SjSexNl6_sEgjlcE",
  authDomain: "portal-santri-881d1.firebaseapp.com",
  projectId: "portal-santri-881d1",
  storageBucket: "portal-santri-881d1.firebasestorage.app",
  messagingSenderId: "524639569993",
  appId: "1:524639569993:web:878b9789c1f3685e115798"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };