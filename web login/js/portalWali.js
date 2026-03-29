// CEK LOGIN
if(localStorage.getItem("role") !== "wali"){
  alert("Silakan login terlebih dahulu")
  window.location = "index.html"
}

import { db } from "./firebase.js";
import {
doc,
getDoc,
collection,
query,
where,
getDocs
} from "https://www.gstatic.com/firebasejs/12.10.0/firebase-firestore.js";

const santriId = localStorage.getItem("santriId")

// ======================
// LOAD DATA SANTRI
// ======================
async function loadData(){

const docRef = doc(db,"santri",santriId)
const docSnap = await getDoc(docRef)

if(docSnap.exists()){
const data = docSnap.data()

document.getElementById("dataSantri").innerHTML = `
Nama : ${data.nama} <br>
NIS : ${data.nis} <br>
Kelas : ${data.kelas} <br>
Nama Wali : ${data.wali} <br>
Alamat : ${data.alamat}
`

document.getElementById("namaSantriHeader").innerText = data.nama
}

}

// ======================
// TAGIHAN BULAN INI
// ======================
async function loadTagihanBulanIni(){

const bulanSekarang = new Date().toISOString().slice(0,7)

const q = query(
collection(db,"pembayaran"),
where("santriId","==",santriId),
where("bulan","==",bulanSekarang)
)

const snap = await getDocs(q)

if(snap.empty){
document.getElementById("tagihanTotal").innerText = "Rp 0"
document.getElementById("statusTagihan").innerText = "Belum Ada Tagihan"
return
}

snap.forEach(doc=>{

const d = doc.data()

const syah = d.syahriyah || 0
const madin = d.madin || 0
const kos = d.kosMakan || 0
const urunan = d.urunan || 0

const total = syah + madin + kos + urunan

document.getElementById("tagihanSyahriyah").innerText = "Rp " + syah.toLocaleString("id-ID")
document.getElementById("tagihanMadin").innerText = "Rp " + madin.toLocaleString("id-ID")
document.getElementById("tagihanKos").innerText = "Rp " + kos.toLocaleString("id-ID")
document.getElementById("tagihanUrunan").innerText = "Rp " + urunan.toLocaleString("id-ID")

document.getElementById("tagihanTotal").innerText = "Rp " + total.toLocaleString("id-ID")
document.getElementById("statusTagihan").innerText = d.status

})

}

/// ======================
// FORMAT BULAN
// ======================
function formatBulan(bulanString){
  const bulanArr = [
    "Januari","Februari","Maret","April","Mei","Juni",
    "Juli","Agustus","September","Oktober","November","Desember"
  ]

  const [tahun, bulan] = bulanString.split("-")
  return bulanArr[parseInt(bulan) - 1] + " " + tahun
}


// ======================
// RIWAYAT PEMBAYARAN
// ======================
async function loadRiwayatPembayaran(){

  const container = document.getElementById("riwayatPembayaran")
  if(!container) return

  container.innerHTML = ""

  const q = query(
    collection(db,"pembayaran"),
    where("santriId","==",santriId)
  )

  const snap = await getDocs(q)

  snap.forEach(doc=>{

    const d = doc.data()

    const total =
    (d.syahriyah || 0) +
    (d.madin || 0) +
    (d.kosMakan || 0) +
    (d.urunan || 0)

    container.innerHTML += `
    <div class="card">

      <h3 class="bulan">${formatBulan(d.bulan)}</h3>

      <div class="item">
        <span>Syahriyah</span>
        <span>Rp ${(d.syahriyah || 0).toLocaleString("id-ID")}</span>
      </div>

      <div class="item">
        <span>Madin</span>
        <span>Rp ${(d.madin || 0).toLocaleString("id-ID")}</span>
      </div>

      <div class="item">
        <span>Kos</span>
        <span>Rp ${(d.kosMakan || 0).toLocaleString("id-ID")}</span>
      </div>

      <div class="item">
        <span>Urunan</span>
        <span>Rp ${(d.urunan || 0).toLocaleString("id-ID")}</span>
      </div>

      <hr>

      <div class="total">
        <b>Total</b>
        <b>Rp ${total.toLocaleString("id-ID")}</b>
      </div>

      <div class="status ${d.status.replace(" ", "")}">
        ${d.status}
      </div>

    </div>
    `
  })

}

// ======================
// ABSENSI
// ======================
async function loadAbsensi(){

const div = document.getElementById("riwayatAbsensi")

const q = query(
collection(db,"absensi"),
where("santriId","==",santriId)
)

const snap = await getDocs(q)

div.innerHTML = ""

snap.forEach(doc=>{
const d = doc.data()

div.innerHTML += `
<div class="card">
${d.tanggal} - ${d.kegiatan} - ${d.status}
</div>
`
})

}

// ======================
// PENGUMUMAN
// ======================
async function loadPengumuman(){

const container = document.getElementById("listPengumuman")

const snap = await getDocs(collection(db,"pengumuman"))

container.innerHTML = ""

snap.forEach(doc=>{
const d = doc.data()

container.innerHTML += `
<div class="card">
<h3>${d.judul}</h3>
<p>${d.isi}</p>
<small>${d.tanggal}</small>
</div>
`
})

}

// ======================
// TAB FIX
// ======================
window.openTab = function(tabName, el){

document.querySelectorAll(".tab").forEach(t=>{
t.classList.remove("active")
})

document.querySelectorAll(".nav-btn").forEach(b=>{
b.classList.remove("active")
})

document.getElementById("tab-"+tabName).classList.add("active")

if(el) el.classList.add("active")

}

// ======================
// LOGOUT
// ======================
window.logout = function(){
localStorage.clear()
window.location = "index.html"
}

// ======================
// INIT
// ======================
window.onload = function(){
loadData()
loadTagihanBulanIni()
loadRiwayatPembayaran()
loadAbsensi()
loadPengumuman()
}