# ⚡ Quick Start Guide

Panduan cepat untuk memulai dalam 10 menit!

## 🎯 Langkah Cepat

### 1️⃣ Setup Supabase (5 menit)

1. Buka [supabase.com](https://supabase.com) → Buat project baru
2. Tunggu project selesai dibuat
3. Buka **SQL Editor** → Jalankan file `supabase-schema.sql`
4. Buka **Authentication** → **Users** → Buat user admin
5. Buka **Settings** → **API** → Copy **Project URL** dan **anon key**

### 2️⃣ Konfigurasi Project (2 menit)

1. Buka file `js/config.js`
2. Ganti `SUPABASE_URL` dan `SUPABASE_ANON_KEY` dengan nilai dari Supabase
3. Simpan file

### 3️⃣ Testing Lokal (1 menit)

**Cara termudah:**
- Buka `index.html` langsung di browser

**Atau gunakan Live Server:**
- Install extension Live Server di VS Code
- Klik kanan `index.html` → Open with Live Server

### 4️⃣ Setup Admin (2 menit)

1. Buka `admin.html` di browser
2. Login dengan email dan password yang dibuat di Supabase
3. Klik **"Pengaturan"** → Isi semua informasi brand Anda
4. Klik **"Kelola Kategori"** → Tambah beberapa kategori
5. Klik **"Tambah Produk"** → Tambah produk pertama Anda

### 5️⃣ Deploy ke Vercel (Optional)

1. Push code ke GitHub
2. Buka [vercel.com](https://vercel.com) → Import project
3. Deploy!

---

## 📝 Checklist Minimal

Sebelum mulai, pastikan Anda punya:

- ✅ Akun Supabase (gratis)
- ✅ Browser modern
- ✅ Text editor

---

## 🎨 Kustomisasi Cepat

### Ganti Warna Tema

Edit di `index.html` dan `dashboard.html`, cari:

```css
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
```

Ganti dengan warna favorit Anda!

### Ganti Font

Edit di `index.html`, cari:

```css
@import url('https://fonts.googleapis.com/css2?family=Inter:...');
```

Ganti `Inter` dengan font Google Fonts lainnya.

---

## 🔗 Link Penting

- **Landing Page**: `index.html`
- **Admin Login**: `admin.html`
- **Admin Dashboard**: `dashboard.html`
- **Config**: `js/config.js`
- **Database Schema**: `supabase-schema.sql`

---

## 💡 Tips

1. **Upload Gambar**: Gunakan [imgur.com](https://imgur.com) untuk hosting gambar gratis
2. **Format WhatsApp**: `6281234567890` (tanpa +, tanpa spasi)
3. **Testing**: Selalu test di mobile device juga!

---

## ❓ Butuh Bantuan?

Baca **SETUP_GUIDE.md** untuk panduan lengkap dan troubleshooting.

---

**Selamat mencoba! 🚀**
