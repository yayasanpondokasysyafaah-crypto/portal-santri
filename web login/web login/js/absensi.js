import { initializeApp } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-app.js";

import { 
getFirestore, 
collection, 
addDoc, 
getDocs 
}
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


// LOAD SANTRI KE DROPDOWN
window.loadSantriDropdown = async function(){

const select = document.getElementById("santriSelect")

select.innerHTML=""

const querySnapshot = await getDocs(collection(db,"santri"))

querySnapshot.forEach((doc)=>{

const data = doc.data()

select.innerHTML += `
<option value="${doc.id}">
${data.nama} - ${data.nis}
</option>
`

})

}


// SIMPAN ABSENSI
window.simpanAbsensi = async function(){

const santriId = document.getElementById("santriSelect").value
const kegiatan = document.getElementById("kegiatan").value
const status = document.getElementById("status").value

await addDoc(collection(db,"absensi"),{

santriId:santriId,
kegiatan:kegiatan,
status:status,
tanggal:new Date().toLocaleDateString()

})

alert("Absensi berhasil disimpan")

}