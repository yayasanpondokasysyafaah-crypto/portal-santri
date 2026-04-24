// CEK LOGIN ADMIN
if(localStorage.getItem("role") !== "admin"){

alert("Akses ditolak")

window.location = "index.html"

}

import { db } from "./firebase.js";


import {
collection,
addDoc,
getDocs,
getDoc,
deleteDoc,
doc,
query,
where,
updateDoc
} from "https://www.gstatic.com/firebasejs/12.10.0/firebase-firestore.js";


const santriCollection = collection(db,"santri")
const pembayaranCollection = collection(db,"pembayaran")


// TAMBAH SANTRI
window.tambahSantri = async function(){

const nama = document.getElementById("nama").value
const nis = document.getElementById("nis").value
const password = document.getElementById("password").value
const kelas = document.getElementById("kelas").value
const wali = document.getElementById("wali").value
const nomorwali = document.getElementById("nomorwali").value
const alamat = document.getElementById("alamat").value


// cek NIS
const q = query(collection(db,"santri"), where("nis","==",nis))
const cek = await getDocs(q)

if(!cek.empty){

alert("NIS sudah terdaftar")
return

}


await addDoc(santriCollection,{
nama:nama,
nis:nis,
password:password,
kelas:kelas,
wali:wali,
nomorwali:nomorwali,
alamat:alamat
})

 setLoading("btnSantri", true, "Menyimpan...");

  try {
    const nama = document.getElementById("nama").value;
    const nis = document.getElementById("nis").value;

    await addDoc(collection(db,"santri"),{
      nama:nama,
      nis:nis
    });

    showToast("Santri berhasil ditambahkan ✅");

  } catch (err) {
    showToast("Gagal: " + err.message, false);
  }

  setLoading("btnSantri", false);


loadSantri()
loadSantriDropdown()

}



// TAMPILKAN DATA
window.loadSantri = async function(){

const dataDiv = document.getElementById("dataSantri")
const searchInput = document.getElementById("searchSantri")
const search = searchInput ? searchInput.value.toLowerCase() : ""

dataDiv.innerHTML = ""

const querySnapshot = await getDocs(santriCollection)

querySnapshot.forEach((docSnap)=>{

const data = docSnap.data()

if(
(data.nama || "").toLowerCase().includes(search) ||
(data.nis || "").includes(search)
){

dataDiv.innerHTML += `
<tr>
<td>${data.nama}</td>
<td>${data.nis}</td>
<td>${data.kelas}</td>
<td>${data.wali}</td>
<td>${data.nomorwali}</td>
<td>${data.alamat}</td>
<td>

<button onclick="editSantri(
'${docSnap.id}',
\`${data.nama}\`,
\`${data.nis}\`,
\`${data.kelas}\`,
\`${data.wali}\`,
\`${data.nomorwali}\`,
\`${data.alamat}\`
)">Edit</button>

<button onclick="hapusSantri('${docSnap.id}')">Hapus</button>
</td>
</tr>
`

}

})

}


// HAPUS SANTRI
window.hapusSantri = async function(id) {

  const konfirmasi = confirm("Yakin mau hapus santri ini?");
  if (!konfirmasi) return;

  await deleteDoc(doc(db, "santri", id));

  alert("Santri berhasil dihapus");

  loadSantri(); // refresh tabel
}

let editId = ""

window.editSantri = function(id,nama,nis,kelas,wali,nomorwali,alamat){

  editId = id

  document.getElementById("editNama").value = nama
  document.getElementById("editNis").value = nis
  document.getElementById("editKelas").value = kelas
  document.getElementById("editWali").value = wali
  document.getElementById("editNomorWali").value = nomorwali
  document.getElementById("editAlamat").value = alamat

  document.getElementById("editModal").style.display = "flex"
}

window.updateSantri = async function(){

const nama = document.getElementById("editNama").value
const nis = document.getElementById("editNis").value
const kelas = document.getElementById("editKelas").value
const wali = document.getElementById("editWali").value
const nomorwali = document.getElementById("editNomorWali").value
const alamat = document.getElementById("editAlamat").value


if(!nama || !nis || !kelas || !wali || !nomorwali || !alamat){
alert("Isi semua data!")
return
}

await updateDoc(doc(db,"santri",editId),{
nama:nama,
nis:nis,
kelas:kelas,
wali:wali,
nomorwali:nomorwali,
alamat:alamat
})

alert("Data berhasil diupdate")

document.getElementById("editModal").style.display = "none"

loadSantri()

}

window.tutupEdit = function(){
document.getElementById("editModal").style.display = "none"
}





async function loadSantriDropdown(){

const select = document.getElementById("santriSelect")

if(select){
select.innerHTML = ""
}

const querySnapshot = await getDocs(santriCollection)

querySnapshot.forEach((docSnap)=>{

const data = docSnap.data()

select.innerHTML += `
<option value="${docSnap.id}">
${data.nama} - ${data.nis}
</option>
`

})

}


async function loadStatistik(){

const santriSnapshot = await getDocs(collection(db,"santri"))

const pembayaranSnapshot = await getDocs(collection(db,"pembayaran"))

let totalSantri = santriSnapshot.size

let totalPembayaran = pembayaranSnapshot.size
let totalUang = 0

pembayaranSnapshot.forEach((doc)=>{
const data = doc.data()

const total =
(data.syahriyah || 0) +
(data.madin || 0) +
(data.kosMakan || 0) +
(data.urunan || 0)

totalUang += total
})

document.getElementById("totalSantri").innerText = totalSantri

document.getElementById("totalPembayaran").innerText = totalPembayaran
document.getElementById("totalUang").innerText = totalUang
}



//pembayaran

async function loadSantriPembayaran(){

const select = document.getElementById("pembayaranSantri")

select.innerHTML = ""

const querySnapshot = await getDocs(santriCollection)

querySnapshot.forEach((docSnap)=>{

const data = docSnap.data()

select.innerHTML += `
<option value="${docSnap.id}">
${data.nama} - ${data.nis}
</option>
`

})

}


function hitungTotal(){

const syahriyah = document.getElementById("syahriyahCheck").checked ? 30000 : 0
const madin = document.getElementById("madinCheck").checked ? 30000 : 0
const kosMakan = parseInt(document.getElementById("kosMakan").value) || 0
const urunan = parseInt(document.getElementById("urunan").value) || 0

const total = syahriyah + madin + kosMakan + urunan

document.getElementById("totalBayar").innerText =
"Rp " + total.toLocaleString("id-ID")

}

document.getElementById("syahriyahCheck").addEventListener("change", hitungTotal)
document.getElementById("madinCheck").addEventListener("change", hitungTotal)
document.getElementById("kosMakan").addEventListener("change", hitungTotal)
document.getElementById("urunan").addEventListener("input", hitungTotal)


window.simpanPembayaran = async function(){

const santriId = document.getElementById("pembayaranSantri").value
const bulan = document.getElementById("bulanPembayaran").value
const status = document.getElementById("statusPembayaran").value

const syahriyah = document.getElementById("syahriyahCheck").checked ? 30000 : 0
const madin = document.getElementById("madinCheck").checked ? 30000 : 0
const urunan = Number(document.getElementById("urunan").value) || 0

let kosMakan = parseInt(document.getElementById("kosMakan").value) || 0

await addDoc(collection(db,"pembayaran"),{
santriId: santriId,
bulan: bulan,
syahriyah: syahriyah,
madin: madin,
kosMakan: kosMakan,
urunan: urunan,
status: status
})

alert("Pembayaran berhasil disimpan")

}
//logout

window.logout = function(){

localStorage.clear()

window.location = "index.html"

}

window.simpanPengumuman = async function(){

const judul = document.getElementById("judulPengumuman").value
const isi = document.getElementById("isiPengumuman").value

const tanggal = new Date().toISOString().split("T")[0]

await addDoc(collection(db,"pengumuman"),{

judul: judul,
isi: isi,
tanggal: tanggal

})

alert("Pengumuman berhasil dikirim")

}






function tampilkanPopup(judul, isi){
document.getElementById("judulPopup").innerText = judul
document.getElementById("isiPopup").innerHTML = isi
document.getElementById("popupSantri").style.display = "flex"
}

window.tutupPopup = function(){
document.getElementById("popupSantri").style.display = "none"
}



window.LihatSudahBayar = async function(){

const snapshot = await getDocs(collection(db,"pembayaran"))

let html = ""

snapshot.forEach(doc=>{
const data = doc.data()

html += `<div>${data.nama}</div>`
})

tampilkanPopup("Santri Sudah Bayar", html)

}

window.LihatBelumBayar = async function(){

const snapshot = await getDocs(collection(db,"santri"))

let html = ""

snapshot.forEach(doc=>{
const data = doc.data()

if(!data.bayar){
html += `<div>${data.nama}</div>`
}

})

tampilkanPopup("Santri Belum Bayar", html)

}

window.toggleDarkMode = function(){
document.body.classList.toggle("dark")
}

window.downloadExcel = async function(){

const santriSnap = await getDocs(collection(db,"santri"))
const bayarSnap = await getDocs(collection(db,"pembayaran"))


let sudahBayar = []


bayarSnap.forEach(doc=>{
sudahBayar.push(doc.data().nama)
})


let data = []

santriSnap.forEach(doc=>{
const s = doc.data()

data.push({
Nama: s.nama,
NIS: s.nis,
Pembayaran: sudahBayar.includes(s.nama) ? "Sudah Bayar" : "Belum Bayar",

})

})

const worksheet = XLSX.utils.json_to_sheet(data)
const workbook = XLSX.utils.book_new()

XLSX.utils.book_append_sheet(workbook, worksheet, "Laporan Pondok")

XLSX.writeFile(workbook, "laporan_pondok.xlsx")

}

window.backupDatabase = async function(){

const santriSnap = await getDocs(collection(db,"santri"))
const bayarSnap = await getDocs(collection(db,"pembayaran"))


let backup = {
santri: [],
pembayaran: [],

}

santriSnap.forEach(doc=>{
backup.santri.push(doc.data())
})

bayarSnap.forEach(doc=>{
backup.pembayaran.push(doc.data())
})



const dataStr = JSON.stringify(backup, null, 2)

const blob = new Blob([dataStr], { type: "application/json" })

const url = URL.createObjectURL(blob)

const a = document.createElement("a")
a.href = url
a.download = "backup_pondok.json"
a.click()

URL.revokeObjectURL(url)

}

// ================= PENGUMUMAN =================

// LOAD
window.loadPengumuman = async function () {
  const list = document.getElementById("listPengumuman");
  if (!list) return;

  list.innerHTML = "";

  const snapshot = await getDocs(collection(db, "pengumuman"));

  snapshot.forEach((docSnap) => {
    const data = docSnap.data();

    list.innerHTML += `
      <div style="border:1px solid #ccc; padding:10px; margin:10px 0;">
        <b>${data.judul}</b>
        <p>${data.isi}</p>
        <small>${data.tanggal}</small><br>

        <button onclick="editPengumuman('${docSnap.id}', \`${data.judul}\`, \`${data.isi}\`)">Edit</button>
        <button onclick="hapusPengumuman('${docSnap.id}')">Hapus</button>
      </div>
    `;
  });
};


// HAPUS
window.hapusPengumuman = async function (id) {
  if (!confirm("Yakin hapus?")) return;

  await deleteDoc(doc(db, "pengumuman", id));
  loadPengumuman();
};


// EDIT
window.editPengumuman = async function (id, judulLama, isiLama) {
  const judulBaru = prompt("Edit judul:", judulLama);
  const isiBaru = prompt("Edit isi:", isiLama);

  if (!judulBaru || !isiBaru) return;

  await updateDoc(doc(db, "pengumuman", id), {
    judul: judulBaru,
    isi: isiBaru
  });

  loadPengumuman();
};

function setLoading(buttonId, isLoading, text = "Loading...") {
  const btn = document.getElementById(buttonId);

  if (isLoading) {
    btn.disabled = true;
    btn.dataset.text = btn.innerHTML;

    btn.innerHTML = `<span class="spinner-btn"></span> ${text}`;
  } else {
    btn.disabled = false;
    btn.innerHTML = btn.dataset.text;
  }
}

function showToast(message, success = true) {
  const toast = document.getElementById("toast");

  toast.innerText = message;
  toast.style.background = success ? "#22c55e" : "#ef4444";

  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 3000);
}

window.onload = function(){

loadSantri()
loadStatistik()

loadSantriPembayaran()
loadPengumuman()
}

