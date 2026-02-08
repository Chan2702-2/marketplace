# 🧪 Panduan Testing Lokal

## ⚠️ PENTING: Project Ini Butuh Supabase

Project ini **TIDAK BISA** jalan tanpa Supabase karena:
- ❌ Tidak ada backend PHP/Node.js lokal
- ❌ Tidak bisa pakai MySQL/PostgreSQL lokal
- ✅ 100% pakai Supabase cloud (gratis)

---

## 🚀 Cara Testing Lokal (Tetap Pakai Supabase)

### Langkah 1: Setup Supabase Dulu (5 menit - GRATIS)

1. **Buat Project Supabase**:
   - Buka [supabase.com](https://supabase.com)
   - Sign up (gratis, pakai email/GitHub)
   - Klik **"New Project"**
   - Isi:
     - Name: `marketplace-test`
     - Database Password: buat password (simpan!)
     - Region: Singapore
   - Tunggu 2-3 menit

2. **Setup Database**:
   - Buka **SQL Editor** di sidebar
   - Klik **"New query"**
   - Copy SEMUA isi file `supabase-schema.sql`
   - Paste ke editor
   - Klik **"Run"** (atau Ctrl+Enter)
   - Tunggu sampai sukses

3. **Tambah Sample Data** (Opsional):
   - Masih di SQL Editor
   - Klik **"New query"** lagi
   - Copy SEMUA isi file `sample-data.sql`
   - Paste & Run
   - Sekarang lo punya 8 produk sample

4. **Buat Admin User**:
   - Klik **Authentication** di sidebar
   - Klik tab **Users**
   - Klik **"Add user"** → **"Create new user"**
   - Isi:
     - Email: `admin@test.com` (atau email lo)
     - Password: `admin123` (atau password lo)
     - ✅ Centang **"Auto Confirm User"**
   - Klik **"Create user"**

5. **Ambil Credentials** (masih di Supabase dashboard):
   - Klik **Settings** (ikon gear) di sidebar Supabase
   - Klik **API**
   - Copy 2 nilai ini:
     - **Project URL**: `https://xxxxx.supabase.co`
     - **anon public**: `eyJhbGc...` (key panjang)

6. **Update Config**:
   - Buka file `js/config.js`
   - Ganti baris 3-4:
   ```javascript
   const SUPABASE_URL = 'https://xxxxx.supabase.co'; // Paste URL lo
   const SUPABASE_ANON_KEY = 'eyJhbGc...'; // Paste key lo
   ```
   - Save file

---

### Langkah 2: Jalankan di Laragon

#### Opsi A: Pakai Apache di Laragon (Paling Mudah)

1. **Start Laragon**:
   - Buka Laragon
   - Klik **"Start All"**

2. **Copy Project ke Laragon**:
   ```
   Copy semua file project ke:
   C:\laragon\www\marketplace\
   ```

3. **Buka di Browser**:
   ```
   http://localhost/marketplace/index.html
   ```

#### Opsi B: Pakai Terminal di Laragon

1. **Buka Terminal Laragon**:
   - Klik kanan Laragon → **"Terminal"**

2. **Masuk ke Folder Project**:
   ```bash
   cd C:\laragon\www\marketplace
   ```

3. **Jalankan Server**:
   
   **Pakai PHP Built-in Server**:
   ```bash
   php -S localhost:3000
   ```
   
   **Atau pakai Python**:
   ```bash
   python -m http.server 3000
   ```
   
   **Atau pakai Node.js**:
   ```bash
   npx http-server -p 3000
   ```

4. **Buka Browser**:
   ```
   http://localhost:3000
   ```

#### Opsi C: Langsung Buka File (Paling Cepat)

1. **Double-click** file `index.html`
2. Atau klik kanan → **"Open with"** → **Chrome/Firefox**

⚠️ **Note**: Beberapa fitur mungkin tidak jalan karena CORS policy browser.

---

## 🧪 Testing Checklist

### 1. Test Landing Page
- [ ] Buka `http://localhost:3000/index.html`
- [ ] Logo & brand name muncul
- [ ] Kategori produk muncul
- [ ] Produk sample muncul (8 produk)
- [ ] Klik produk → modal detail muncul
- [ ] Carousel gambar berfungsi
- [ ] Filter kategori berfungsi
- [ ] WhatsApp button muncul di kanan bawah

### 2. Test Admin Panel
- [ ] Buka `http://localhost:3000/admin.html`
- [ ] Login dengan email & password yang dibuat
- [ ] Redirect ke dashboard
- [ ] Stats muncul (8 produk, dll)
- [ ] Tabel produk muncul
- [ ] Klik "Tambah Produk" → modal muncul
- [ ] Isi form & simpan → produk bertambah
- [ ] Edit produk → data muncul di form
- [ ] Hapus produk → produk hilang
- [ ] Kelola kategori berfungsi
- [ ] Pengaturan berfungsi

---

## 🐛 Troubleshooting

### Error: "Failed to fetch"
**Penyebab**: Config Supabase belum diupdate

**Solusi**:
1. Cek `js/config.js` baris 3-4
2. Pastikan URL & Key sudah benar
3. Refresh browser (Ctrl+F5)

### Error: "Invalid API key"
**Penyebab**: Key salah atau expired

**Solusi**:
1. Buka Supabase → Settings → API
2. Copy ulang **anon public key**
3. Update `js/config.js`

### Produk tidak muncul
**Penyebab**: Database kosong atau produk tidak aktif

**Solusi**:
1. Jalankan `sample-data.sql` di Supabase SQL Editor
2. Atau tambah produk manual via admin panel
3. Pastikan produk di-set **"Aktif"**

### Login gagal
**Penyebab**: User belum dibuat atau password salah

**Solusi**:
1. Buka Supabase → Authentication → Users
2. Cek apakah user ada
3. Jika belum, buat user baru
4. Pastikan "Auto Confirm User" dicentang

### CORS Error (jika buka langsung file)
**Penyebab**: Browser block request dari file://

**Solusi**:
- Jangan buka file langsung
- Pakai server (Apache, PHP, Python, Node)
- Atau install extension "Live Server" di VS Code

---

## 💡 Tips

### 1. Pakai VS Code Live Server (Paling Praktis)
1. Install extension **"Live Server"** di VS Code
2. Klik kanan `index.html`
3. Pilih **"Open with Live Server"**
4. Auto-reload setiap kali save file

### 2. Lihat Console untuk Debug
- Tekan **F12** di browser
- Klik tab **Console**
- Lihat error messages (kalau ada)

### 3. Test di Mobile
- Buka di HP: `http://192.168.x.x:3000`
- Ganti `192.168.x.x` dengan IP komputer lo
- Cek IP: `ipconfig` di CMD

---

## 📊 Sample Data yang Tersedia

Setelah jalankan `sample-data.sql`, lo punya:

**8 Produk**:
1. Smartphone XYZ Pro (Elektronik) - Rp 7.499.000
2. Laptop Gaming RGB (Elektronik) - Rp 13.999.000
3. Kaos Premium Cotton (Fashion) - Rp 99.000
4. Serum Wajah Vitamin C (Kecantikan) - Rp 189.000
5. Blender Multifungsi 2L (Rumah Tangga) - Rp 299.000
6. Matras Yoga Premium (Olahraga) - Rp 149.000
7. Smartwatch Fitness Tracker (Elektronik) - Rp 799.000
8. Tas Ransel Laptop 15.6" (Fashion) - Rp 249.000

**5 Kategori**:
- Elektronik
- Fashion
- Kecantikan
- Rumah Tangga
- Olahraga

---

## 🎯 Kesimpulan

**Untuk testing lokal, lo TETAP BUTUH Supabase (gratis).**

Workflow:
1. ✅ Setup Supabase (5 menit, gratis, sekali aja)
2. ✅ Update `js/config.js` dengan credentials
3. ✅ Jalankan di Laragon/localhost
4. ✅ Test semua fitur
5. ✅ Kalau OK, deploy ke Vercel

**Supabase Free Tier**:
- ✅ 500MB database
- ✅ 1GB file storage
- ✅ 50,000 monthly active users
- ✅ Unlimited API requests
- ✅ Cukup banget untuk testing & production

---

**Udah jelas bro? Setup Supabase dulu (gratis), baru bisa test lokal!** 🚀
