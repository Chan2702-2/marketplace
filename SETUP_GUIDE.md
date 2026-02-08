# 📘 Panduan Setup Lengkap - Marketplace Landing Page

Panduan ini akan membantu Anda mengatur website marketplace landing page dari awal hingga siap digunakan.

---

## 📋 Daftar Isi

1. [Persiapan Awal](#persiapan-awal)
2. [Setup Supabase](#setup-supabase)
3. [Konfigurasi Project](#konfigurasi-project)
4. [Testing Lokal](#testing-lokal)
5. [Deploy ke Vercel](#deploy-ke-vercel)
6. [Penggunaan Admin Panel](#penggunaan-admin-panel)
7. [Troubleshooting](#troubleshooting)

---

## 🚀 Persiapan Awal

### Yang Anda Butuhkan:

- ✅ Akun [Supabase](https://supabase.com) (gratis)
- ✅ Akun [Vercel](https://vercel.com) (gratis) - untuk hosting
- ✅ Akun [GitHub](https://github.com) (gratis) - untuk deploy
- ✅ Text editor (VS Code recommended)
- ✅ Browser modern (Chrome, Firefox, Edge)

---

## 🗄️ Setup Supabase

### Langkah 1: Buat Project Supabase

1. Buka [supabase.com](https://supabase.com)
2. Klik **"Start your project"** atau **"New Project"**
3. Isi detail project:
   - **Name**: `marketplace-landing` (atau nama lain)
   - **Database Password**: Buat password yang kuat (simpan baik-baik!)
   - **Region**: Pilih yang terdekat (Southeast Asia - Singapore)
4. Klik **"Create new project"**
5. Tunggu beberapa menit hingga project selesai dibuat

### Langkah 2: Dapatkan API Credentials

1. Di dashboard Supabase, klik **Settings** (ikon gear) di sidebar
2. Klik **API** di menu settings
3. Anda akan melihat:
   - **Project URL**: `https://xxxxx.supabase.co`
   - **anon public key**: `eyJhbGc...` (key yang panjang)
4. **SIMPAN KEDUA VALUE INI** - Anda akan membutuhkannya nanti

### Langkah 3: Setup Database

1. Di dashboard Supabase, klik **SQL Editor** di sidebar
2. Klik **"New query"**
3. Buka file `supabase-schema.sql` dari project ini
4. **Copy semua isi file** dan paste ke SQL Editor
5. Klik **"Run"** atau tekan `Ctrl+Enter`
6. Tunggu hingga muncul pesan sukses

✅ **Database Anda sudah siap!**

### Langkah 4: Setup Authentication

1. Di dashboard Supabase, klik **Authentication** di sidebar
2. Klik **Users** tab
3. Klik **"Add user"** → **"Create new user"**
4. Isi:
   - **Email**: email admin Anda (contoh: `admin@yourbrand.com`)
   - **Password**: password yang kuat
   - **Auto Confirm User**: ✅ Centang ini
5. Klik **"Create user"**

✅ **Akun admin Anda sudah dibuat!**

---

## ⚙️ Konfigurasi Project

### Langkah 1: Edit File Config

1. Buka file `js/config.js`
2. Ganti nilai berikut dengan credentials Supabase Anda:

```javascript
const SUPABASE_URL = 'https://xxxxx.supabase.co'; // Ganti dengan Project URL Anda
const SUPABASE_ANON_KEY = 'eyJhbGc...'; // Ganti dengan anon key Anda
```

3. **Simpan file**

✅ **Konfigurasi selesai!**

---

## 🧪 Testing Lokal

### Opsi 1: Menggunakan Live Server (Recommended)

1. Install extension **Live Server** di VS Code
2. Klik kanan pada `index.html`
3. Pilih **"Open with Live Server"**
4. Website akan terbuka di browser

### Opsi 2: Menggunakan Python

```bash
# Python 3
python -m http.server 3000
```

Buka browser dan akses: `http://localhost:3000`

### Opsi 3: Menggunakan Node.js

```bash
npm install
npm run dev
```

### Testing Checklist:

- ✅ Halaman utama terbuka tanpa error
- ✅ Logo dan nama brand muncul
- ✅ Tombol social media berfungsi
- ✅ Tombol marketplace berfungsi
- ✅ WhatsApp floating button muncul di kanan bawah
- ✅ Kategori produk muncul (minimal "Semua Produk")

---

## 🌐 Deploy ke Vercel

### Langkah 1: Push ke GitHub

1. Buat repository baru di GitHub
2. Di terminal/command prompt, jalankan:

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/username/repo-name.git
git push -u origin main
```

### Langkah 2: Deploy di Vercel

1. Buka [vercel.com](https://vercel.com)
2. Login dengan GitHub
3. Klik **"Add New..."** → **"Project"**
4. Pilih repository Anda
5. Klik **"Import"**
6. **Framework Preset**: Other (biarkan default)
7. Klik **"Deploy"**
8. Tunggu beberapa menit

✅ **Website Anda sudah online!**

### Langkah 3: Custom Domain (Opsional)

1. Di Vercel dashboard, buka project Anda
2. Klik **"Settings"** → **"Domains"**
3. Tambahkan domain Anda
4. Ikuti instruksi untuk setup DNS

---

## 👨‍💼 Penggunaan Admin Panel

### Login ke Admin Panel

1. Buka `https://your-domain.vercel.app/admin.html`
2. Masukkan email dan password yang Anda buat di Supabase
3. Klik **"Masuk"**

### Menambah Produk

1. Di dashboard, klik **"Tambah Produk"**
2. Isi form:
   - **Nama Produk**: Nama produk Anda
   - **Kategori**: Pilih kategori (atau buat baru dulu)
   - **Harga Asli**: Harga sebelum diskon
   - **Harga Promo**: Harga setelah diskon
   - **Deskripsi**: Deskripsi produk
   - **Spesifikasi**: Detail spesifikasi
   - **Link Shopee**: URL produk di Shopee
   - **Link Tokopedia**: URL produk di Tokopedia
   - **Gambar Produk**: Masukkan URL gambar (bisa dari Imgur, Google Drive public, dll)
   - **Produk Aktif**: Centang jika ingin langsung ditampilkan
3. Klik **"Simpan Produk"**

### Mengelola Kategori

1. Klik **"Kelola Kategori"**
2. Untuk menambah: Ketik nama kategori → Klik **"Tambah"**
3. Untuk menghapus: Klik ikon trash di samping kategori

### Mengatur Pengaturan Website

1. Klik **"Pengaturan"**
2. Isi semua field:
   - **Nama Brand**: Nama toko/brand Anda
   - **Tagline**: Slogan singkat
   - **URL Logo**: Link ke logo Anda (bulat, 150x150px recommended)
   - **Instagram URL**: Link profil Instagram
   - **Facebook URL**: Link halaman Facebook
   - **TikTok URL**: Link profil TikTok
   - **Nomor WhatsApp**: Format: `6281234567890` (tanpa +, tanpa spasi)
   - **Shopee Store URL**: Link toko Shopee Anda
   - **Tokopedia Store URL**: Link toko Tokopedia Anda
3. Klik **"Simpan Pengaturan"**

### Tips Upload Gambar

**Cara mudah upload gambar:**

1. **Menggunakan Imgur** (Recommended):
   - Buka [imgur.com](https://imgur.com)
   - Upload gambar
   - Klik kanan pada gambar → Copy image address
   - Paste URL ke form produk

2. **Menggunakan Supabase Storage**:
   - Di Supabase dashboard → Storage
   - Upload gambar ke bucket `product-images`
   - Copy public URL

3. **Menggunakan Google Drive**:
   - Upload gambar
   - Set sharing ke "Anyone with the link"
   - Gunakan format: `https://drive.google.com/uc?id=FILE_ID`

---

## 🔧 Troubleshooting

### Error: "Failed to fetch"

**Penyebab**: Koneksi ke Supabase gagal

**Solusi**:
1. Cek apakah `SUPABASE_URL` dan `SUPABASE_ANON_KEY` sudah benar di `js/config.js`
2. Pastikan tidak ada typo
3. Cek koneksi internet Anda

### Error: "Invalid API key"

**Penyebab**: API key salah atau expired

**Solusi**:
1. Buka Supabase dashboard → Settings → API
2. Copy ulang **anon public key**
3. Update di `js/config.js`

### Produk tidak muncul di website

**Penyebab**: Produk mungkin tidak aktif atau database kosong

**Solusi**:
1. Login ke admin panel
2. Cek apakah produk ada di tabel
3. Pastikan checkbox "Produk Aktif" tercentang
4. Refresh halaman utama

### Login admin gagal

**Penyebab**: Email/password salah atau user belum dibuat

**Solusi**:
1. Buka Supabase dashboard → Authentication → Users
2. Cek apakah user sudah ada
3. Jika belum, buat user baru
4. Pastikan "Auto Confirm User" dicentang

### Gambar tidak muncul

**Penyebab**: URL gambar tidak valid atau private

**Solusi**:
1. Cek apakah URL gambar bisa dibuka di browser
2. Pastikan gambar bersifat public (tidak perlu login)
3. Gunakan URL direct image (berakhiran .jpg, .png, dll)

### WhatsApp button tidak berfungsi

**Penyebab**: Format nomor WhatsApp salah

**Solusi**:
1. Format yang benar: `6281234567890`
2. Tanpa tanda `+`
3. Tanpa spasi atau tanda hubung
4. Dimulai dengan kode negara (62 untuk Indonesia)

---

## 📱 Tips Optimasi

### 1. Optimasi Gambar

- Gunakan format WebP atau JPEG
- Ukuran maksimal 500KB per gambar
- Resolusi recommended: 800x600px
- Compress gambar di [tinypng.com](https://tinypng.com)

### 2. SEO

Edit `index.html` dan tambahkan meta tags:

```html
<meta name="description" content="Deskripsi toko Anda">
<meta name="keywords" content="produk, marketplace, toko online">
<meta property="og:title" content="Nama Brand Anda">
<meta property="og:description" content="Deskripsi singkat">
<meta property="og:image" content="URL logo Anda">
```

### 3. Performance

- Gunakan CDN untuk gambar (Cloudinary, Imgur)
- Minimize jumlah produk per halaman (max 50)
- Compress gambar sebelum upload

---

## 🎯 Checklist Sebelum Go Live

- [ ] Supabase project sudah dibuat
- [ ] Database schema sudah dijalankan
- [ ] Admin user sudah dibuat
- [ ] Config.js sudah diupdate dengan credentials
- [ ] Testing lokal berhasil
- [ ] Minimal 1 kategori sudah dibuat
- [ ] Minimal 1 produk sudah ditambahkan
- [ ] Pengaturan website sudah diisi lengkap
- [ ] Social media links sudah benar
- [ ] WhatsApp number sudah benar
- [ ] Marketplace links sudah benar
- [ ] Website sudah di-deploy ke Vercel
- [ ] Testing di mobile device

---

## 📞 Support

Jika mengalami masalah:

1. Cek console browser (F12) untuk error messages
2. Cek Supabase logs di dashboard
3. Pastikan semua langkah setup sudah diikuti
4. Cek dokumentasi Supabase: [supabase.com/docs](https://supabase.com/docs)

---

## 🎉 Selamat!

Website marketplace landing page Anda sudah siap digunakan!

**Next Steps:**
- Tambahkan lebih banyak produk
- Share link website di bio Instagram/TikTok
- Monitor traffic di Vercel Analytics
- Update produk secara berkala

**Link Penting:**
- Website: `https://your-domain.vercel.app`
- Admin Panel: `https://your-domain.vercel.app/admin.html`
- Supabase Dashboard: `https://app.supabase.com`
- Vercel Dashboard: `https://vercel.com/dashboard`

---

**Happy Selling! 🚀**
