import { initializeApp } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-app.js";

import { getFirestore, collection, getDocs }
from "https://www.gstatic.com/firebasejs/12.10.0/firebase-firestore.js";


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


window.loadSantri = async function(){

const tabel = document.getElementById("tabelSantri")

tabel.innerHTML=""

const querySnapshot = await getDocs(collection(db,"santri"))

querySnapshot.forEach((doc)=>{

const data = doc.data()

tabel.innerHTML += `
<tr>
<td>${data.nama}</td>
<td>${data.nis}</td>
<td>${data.password}</td>
</tr>
`

})

}