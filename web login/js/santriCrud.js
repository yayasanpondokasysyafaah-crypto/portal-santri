import { initializeApp } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-app.js";

import { 
getFirestore, 
collection, 
addDoc, 
getDocs,
deleteDoc,
doc,
updateDoc
} from "https://www.gstatic.com/firebasejs/12.10.0/firebase-firestore.js";


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



// CREATE
window.simpan = async function(){

const username = document.getElementById("username").value
const nama = document.getElementById("nama").value
const nis = document.getElementById("nis").value
const password = document.getElementById("password").value

await addDoc(collection(db,"santri"),{
username:username,
nama:nama,
nis:nis,
password:password
})

alert("Data tersimpan")

tampilData()

}


// READ
async function tampilData(){

const tabel = document.getElementById("tabelSantri")

if(!tabel) return

tabel.innerHTML=""

const querySnapshot = await getDocs(collection(db,"santri"))

querySnapshot.forEach((dataDoc)=>{

const data = dataDoc.data()
const id = dataDoc.id

tabel.innerHTML += `
<tr>
<td>${data.username}</td>
<td>${data.nama}</td>
<td>${data.nis}</td>
<td>${data.password}</td>

<td>

<button onclick="hapus('${id}')">
Hapus
</button>

<button onclick="edit('${id}','${data.username}','${data.nama}','${data.nis}','${data.password}')">
Edit
</button>

<button onclick="lihatPortal('${id}')">
Portal
</button>

</td>

</tr>
`

})

}


// DELETE
window.hapus = async function(id){

await deleteDoc(doc(db,"santri",id));

alert("Data dihapus");

tampilData();

}


// UPDATE
window.edit = async function(id,namaLama,nisLama,passwordLama){

const namaBaru = prompt("Nama baru",namaLama);
const nisBaru = prompt("NIS baru",nisLama);
const passwordBaru = prompt("Password baru",passwordLama);

await updateDoc(doc(db,"santri",id),{

nama:namaBaru,
nis:nisBaru,
password:passwordBaru

});

alert("Data diupdate");

tampilData();

}