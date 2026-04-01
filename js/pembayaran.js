import { initializeApp } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-app.js";

import { 
getFirestore,
collection,
getDocs,
addDoc
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
window.loadSantriPembayaran = async function(){

const select = document.getElementById("santriBayar")

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


// SIMPAN PEMBAYARAN
window.simpanPembayaran = async function(){

const santriId = document.getElementById("santriBayar").value
const bulan = document.getElementById("bulan").value
const jumlah = document.getElementById("jumlah").value
const status = document.getElementById("statusBayar").value

await addDoc(collection(db,"pembayaran"),{

santriId:santriId,
bulan:bulan,
jumlah:jumlah,
status:status,
tanggal:new Date().toLocaleDateString()

})

alert("Pembayaran berhasil disimpan")

}