# 🚀 Panduan Deploy ke Supabase & Vercel

## ⚠️ PENTING: Project Ini 100% Cloud-Based

Project ini **FULL CLOUD** dengan stack:
- ✅ **Supabase** untuk database & authentication (gratis)
- ✅ **Vercel** untuk hosting frontend (gratis)
- ✅ **Zero server maintenance** - semua di cloud
- ✅ **Auto-scaling** & **Global CDN**

---

## 🚀 Cara Deploy (15 Menit - GRATIS)

### Langkah 1: Setup Supabase (5 menit - GRATIS)

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

### Langkah 2: Deploy ke Vercel (5 menit - GRATIS)

#### Opsi A: Deploy via GitHub (Recommended - Auto Deploy)

1. **Push ke GitHub**:
   ```bash
   # Buat repo baru di GitHub dulu
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/username/marketplace.git
   git push -u origin main
   ```

2. **Connect ke Vercel**:
   - Buka [vercel.com](https://vercel.com)
   - Sign up dengan GitHub (gratis)
   - Klik **"Add New"** → **"Project"**
   - Pilih repository `marketplace`
   - Klik **"Import"**

3. **Configure Project**:
   - **Framework Preset**: Other (biarkan default)
   - **Root Directory**: `./` (biarkan default)
   - **Build Command**: (kosongkan)
   - **Output Directory**: (kosongkan)
   - Klik **"Deploy"**

4. **Tunggu Deploy Selesai** (1-2 menit):
   - Vercel akan build & deploy otomatis
   - Setelah selesai, lo dapat URL: `https://marketplace-xxx.vercel.app`

#### Opsi B: Deploy via Vercel CLI (Untuk Developer)

1. **Install Vercel CLI**:
   ```bash
   npm install -g vercel
   ```

2. **Login ke Vercel**:
   ```bash
   vercel login
   ```

3. **Deploy Project**:
   ```bash
   cd d:/job/marketplace
   vercel
   ```
   
   Jawab pertanyaan:
   - Set up and deploy? **Y**
   - Which scope? Pilih account lo
   - Link to existing project? **N**
   - Project name? `marketplace` (atau nama lo)
   - In which directory? `./` (enter)
   - Override settings? **N**

4. **Deploy Production**:
   ```bash
   vercel --prod
   ```

5. **Selesai!** Lo dapat URL production

#### Opsi C: Deploy via Drag & Drop (Paling Cepat)

1. **Buka Vercel Dashboard**:
   - Login ke [vercel.com](https://vercel.com)

2. **Drag & Drop**:
   - Zip semua file project (kecuali `node_modules`, `.git`)
   - Drag zip file ke Vercel dashboard
   - Atau drag folder langsung

3. **Tunggu Deploy**:
   - Vercel auto-detect & deploy
   - Selesai dalam 1-2 menit

---

### Langkah 3: Update Config di Vercel (2 menit)

Setelah deploy, lo perlu update config Supabase di production:

#### Cara 1: Via Vercel Dashboard (Recommended)

1. **Buka Project di Vercel**:
   - Masuk ke [vercel.com/dashboard](https://vercel.com/dashboard)
   - Klik project `marketplace`

2. **Tambah Environment Variables**:
   - Klik tab **"Settings"**
   - Klik **"Environment Variables"**
   - Tambah 2 variables:
     - **Name**: `SUPABASE_URL`
     - **Value**: `https://xxxxx.supabase.co` (dari Supabase)
     - Klik **"Add"**
     
     - **Name**: `SUPABASE_ANON_KEY`
     - **Value**: `eyJhbGc...` (dari Supabase)
     - Klik **"Add"**

3. **Redeploy**:
   - Klik tab **"Deployments"**
   - Klik **"..."** di deployment terakhir
   - Klik **"Redeploy"**
   - Tunggu 1-2 menit

#### Cara 2: Update File `js/config.js` (Alternatif)

1. **Edit file** [`js/config.js`](js/config.js:3):
   ```javascript
   const SUPABASE_URL = 'https://xxxxx.supabase.co'; // Paste URL lo
   const SUPABASE_ANON_KEY = 'eyJhbGc...'; // Paste key lo
   ```

2. **Push ke GitHub**:
   ```bash
   git add js/config.js
   git commit -m "Update Supabase config"
   git push
   ```

3. **Auto Deploy**:
   - Vercel otomatis detect push
   - Auto redeploy dalam 1-2 menit

---

## 🧪 Testing Production

### 1. Test Landing Page
- [ ] Buka `https://marketplace-xxx.vercel.app`
- [ ] Logo & brand name muncul
- [ ] Kategori produk muncul
- [ ] Produk sample muncul (8 produk)
- [ ] Klik produk → modal detail muncul
- [ ] Carousel gambar berfungsi
- [ ] Filter kategori berfungsi
- [ ] WhatsApp button muncul di kanan bawah
- [ ] Test di mobile (responsive)

### 2. Test Admin Panel
- [ ] Buka `https://marketplace-xxx.vercel.app/admin.html`
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
- [ ] Logout berfungsi

### 3. Test Performance
- [ ] Buka [PageSpeed Insights](https://pagespeed.web.dev/)
- [ ] Test URL production
- [ ] Score minimal 90+ (mobile & desktop)
- [ ] Load time < 2 detik

---

## 🐛 Troubleshooting

### Error: "Failed to fetch" di Production
**Penyebab**: Config Supabase belum diupdate di Vercel

**Solusi**:
1. Cek Vercel → Settings → Environment Variables
2. Pastikan `SUPABASE_URL` & `SUPABASE_ANON_KEY` sudah ada
3. Atau update [`js/config.js`](js/config.js:3) & push ke GitHub
4. Redeploy di Vercel

### Error: "Invalid API key"
**Penyebab**: Key salah atau expired

**Solusi**:
1. Buka Supabase → Settings → API
2. Copy ulang **anon public key**
3. Update di Vercel Environment Variables
4. Atau update [`js/config.js`](js/config.js:4) & push

### Produk tidak muncul
**Penyebab**: Database kosong atau produk tidak aktif

**Solusi**:
1. Jalankan [`sample-data.sql`](sample-data.sql:1) di Supabase SQL Editor
2. Atau tambah produk manual via admin panel
3. Pastikan produk di-set **"Aktif"**

### Login gagal
**Penyebab**: User belum dibuat atau password salah

**Solusi**:
1. Buka Supabase → Authentication → Users
2. Cek apakah user ada
3. Jika belum, buat user baru
4. Pastikan "Auto Confirm User" dicentang

### Deploy gagal di Vercel
**Penyebab**: Build error atau file tidak valid

**Solusi**:
1. Cek Vercel → Deployments → Klik deployment gagal
2. Lihat error log
3. Fix error di local
4. Push ke GitHub (auto redeploy)

### Custom Domain tidak jalan
**Penyebab**: DNS belum propagate

**Solusi**:
1. Vercel → Settings → Domains
2. Tambah domain lo
3. Update DNS di registrar (Cloudflare, Namecheap, dll)
4. Tunggu 24-48 jam untuk propagasi

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
