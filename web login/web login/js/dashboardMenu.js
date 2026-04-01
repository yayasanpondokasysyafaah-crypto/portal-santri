function menu(halaman){

const content = document.getElementById("content")

if(halaman=="dashboard"){

content.innerHTML = `
<h2>Dashboard</h2>
<p>Selamat datang di sistem pondok</p>
`

}

if(halaman=="santri"){

content.innerHTML = `
<h2>Data Santri</h2>

<h3>Tambah Santri</h3>

<input id="username" placeholder="Username">
<br><br>

<input id="nama" placeholder="Nama Santri">
<br><br>

<input id="nis" placeholder="NIS">
<br><br>

<input id="password" placeholder="Password">
<br><br>

<button onclick="simpan()">Simpan</button>

<br><br><br>

<table border="1" width="100%">
<thead>
<tr>
<th>Username</th>
<th>Nama</th>
<th>NIS</th>
<th>Password</th>
<th>Aksi</th>
</tr>
</thead>

<tbody id="tabelSantri"></tbody>

</table>
`

tampilData()

}

if(halaman=="absensi"){

content.innerHTML = `
<h2>Absensi Santri</h2>

<label>Pilih Santri</label>
<br>
<select id="santriSelect"></select>

<br><br>

<input id="kegiatan" placeholder="Kegiatan">

<br><br>

<select id="status">
<option value="Hadir">Hadir</option>
<option value="Tidak Hadir">Tidak Hadir</option>
<option value="Izin">Izin</option>
<option value="Sakit">Sakit</option>
<option value="Pulang">Pulang</option>
</select>

<br><br>

<button onclick="simpanAbsensi()">Simpan Absensi</button>

`

loadSantriDropdown()

}

if(halaman=="pembayaran"){

content.innerHTML = `
<h2>Pembayaran Santri</h2>

<label>Pilih Santri</label>
<br>
<select id="santriBayar"></select>

<br><br>

<label>Bulan</label>
<br>
<input id="bulan" placeholder="Contoh: Januari 2026">

<br><br>
<label>Keterangan</label>
<br>
<input id="keterangan" placeholder="Contoh: Syahriyah & Madin Januari 2026">
<br><br>

<label>Jumlah</label>
<br>
<input id="jumlah" placeholder="Contoh: 300000">

<br><br>

<select id="statusBayar">
<option value="Lunas">Lunas</option>
<option value="Belum">Belum</option>
<option value="nyicil">Nyicil</option>
</select>

<br><br>

<button onclick="simpanPembayaran()">Simpan Pembayaran</button>
`

loadSantriPembayaran()

}

if(halaman=="kegiatan"){

content.innerHTML = `
<h2>Kegiatan</h2>
<p>Upload foto kegiatan disini</p>
`

}

}