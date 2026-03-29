import { initializeApp } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-app.js";

import { 
getFirestore,
collection,
getDocs
} from "https://www.gstatic.com/firebasejs/12.10.0/firebase-firestore.js";


const firebaseConfig = {
  apiKey: "AIzaSyB-MOsJObrnD_kgZE7SjSexNl6_sEgjlcE",
  authDomain: "portal-santri-881d1.firebaseapp.com",
  projectId: "portal-santri-881d1",
  storageBucket: "portal-santri-881d1.firebasestorage.app",
  messagingSenderId: "524639569993",
  appId: "1:524639569993:web:878b9789c1f3685e115798"
};

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)


window.loginWali = async function(){

const nis = document.getElementById("nis").value
const password = document.getElementById("password").value

const querySnapshot = await getDocs(collection(db,"santri"))

let ditemukan = false

querySnapshot.forEach((doc)=>{

const data = doc.data()

if(data.nis == nis && data.password == password){

localStorage.setItem("santriId",doc.id)

ditemukan = true

}

})

if(ditemukan){

window.location = "portalWali.html"

}else{

alert("NIS atau password salah")

}

}