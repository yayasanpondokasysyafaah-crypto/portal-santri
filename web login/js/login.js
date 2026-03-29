import { db, auth } from "./firebase.js";

import { 
collection,
getDocs
} from "https://www.gstatic.com/firebasejs/12.10.0/firebase-firestore.js";

import { signInWithEmailAndPassword } 
from "https://www.gstatic.com/firebasejs/12.10.0/firebase-auth.js";


window.login = async function(){

const username = document.getElementById("username").value.trim()
const password = document.getElementById("password").value.trim()


// =========================
// 🔥 1. CEK ADMIN (EMAIL)
// =========================
if(username.includes("@")){

try{

await signInWithEmailAndPassword(auth,username,password)

localStorage.setItem("role","admin")

window.location = "dashboard.html"

return

}catch(error){
alert("Login admin gagal")
return
}

}


// =========================
// 🔥 2. CEK WALI (NIS)
// =========================

const querySnapshot = await getDocs(collection(db,"santri"))

let ditemukan = false
let idSantri = ""

querySnapshot.forEach((doc)=>{

const data = doc.data()

if(data.nis === username && data.password === password){

ditemukan = true
idSantri = doc.id

}

})


if(ditemukan){

localStorage.setItem("role","wali")
localStorage.setItem("santriId",idSantri)

window.location = "portalWali.html"

}else{

alert("NIS atau password salah")

}

}

// BUAT AKUN BARU

window.buatAkun = function(){

const nomorAdmin = "6283176687913" // nomor WA

const pesan = `Assalamualaikum admin pondok,

Saya ingin mendaftarkan/buat akun santri:

Nama Santri :
TTL Santri :
Nama Wali :
No HP Wali :
Alamat :

Mohon diproses 🙏`

const url = "https://wa.me/" + nomorAdmin + "?text=" + encodeURIComponent(pesan)

window.open(url, "_blank")

}