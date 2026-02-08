-- Sample Data untuk Testing
-- Jalankan ini SETELAH menjalankan supabase-schema.sql

-- Insert sample products
INSERT INTO products (name, description, specifications, category, original_price, promo_price, images, shopee_link, tokopedia_link, is_active) VALUES
(
  'Smartphone XYZ Pro',
  'Smartphone flagship dengan kamera 108MP dan layar AMOLED 6.7 inch. Performa maksimal untuk gaming dan multitasking.',
  'Chipset: Snapdragon 888
RAM: 12GB
Storage: 256GB
Kamera: 108MP + 12MP + 8MP
Baterai: 5000mAh
Layar: 6.7" AMOLED 120Hz',
  'Elektronik',
  8999000,
  7499000,
  ARRAY[
    'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800',
    'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=800',
    'https://images.unsplash.com/photo-1592286927505-2fd0d5e2f6c4?w=800'
  ],
  'https://shopee.co.id/product/123456',
  'https://tokopedia.com/product/123456',
  true
),
(
  'Laptop Gaming RGB',
  'Laptop gaming dengan performa tinggi, dilengkapi RGB keyboard dan cooling system canggih.',
  'Processor: Intel Core i7 Gen 11
RAM: 16GB DDR4
Storage: 512GB NVMe SSD
GPU: RTX 3060 6GB
Display: 15.6" FHD 144Hz
Berat: 2.3kg',
  'Elektronik',
  15999000,
  13999000,
  ARRAY[
    'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=800',
    'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=800'
  ],
  'https://shopee.co.id/product/234567',
  'https://tokopedia.com/product/234567',
  true
),
(
  'Kaos Premium Cotton',
  'Kaos premium berbahan 100% cotton combed 30s. Nyaman dipakai sehari-hari dengan berbagai pilihan warna.',
  'Bahan: Cotton Combed 30s
Ukuran: S, M, L, XL, XXL
Sablon: Rubber/Plastisol
Jahitan: Obras rapi
Warna: Hitam, Putih, Navy, Abu',
  'Fashion',
  150000,
  99000,
  ARRAY[
    'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800',
    'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800'
  ],
  'https://shopee.co.id/product/345678',
  'https://tokopedia.com/product/345678',
  true
),
(
  'Serum Wajah Vitamin C',
  'Serum wajah dengan kandungan Vitamin C 20% untuk mencerahkan dan meratakan warna kulit.',
  'Kandungan: Vitamin C 20%, Hyaluronic Acid, Niacinamide
Volume: 30ml
Manfaat: Mencerahkan, anti-aging, melembabkan
BPOM: Terdaftar
Cocok untuk: Semua jenis kulit',
  'Kecantikan',
  299000,
  189000,
  ARRAY[
    'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800',
    'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=800'
  ],
  'https://shopee.co.id/product/456789',
  'https://tokopedia.com/product/456789',
  true
),
(
  'Blender Multifungsi 2L',
  'Blender dengan kapasitas 2 liter, motor kuat 600W, cocok untuk membuat jus, smoothie, dan menghaluskan bumbu.',
  'Kapasitas: 2 Liter
Daya: 600 Watt
Kecepatan: 3 tingkat + pulse
Material: Kaca tahan panas
Pisau: Stainless steel 6 mata
Garansi: 1 tahun',
  'Rumah Tangga',
  450000,
  299000,
  ARRAY[
    'https://images.unsplash.com/photo-1585515320310-259814833e62?w=800'
  ],
  'https://shopee.co.id/product/567890',
  'https://tokopedia.com/product/567890',
  true
),
(
  'Matras Yoga Premium',
  'Matras yoga anti-slip dengan ketebalan 6mm, dilengkapi tas pembawa. Nyaman untuk yoga dan fitness.',
  'Ukuran: 183cm x 61cm
Ketebalan: 6mm
Material: NBR eco-friendly
Fitur: Anti-slip, water resistant
Bonus: Tas pembawa + tali pengikat
Warna: Pink, Purple, Blue, Black',
  'Olahraga',
  250000,
  149000,
  ARRAY[
    'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=800',
    'https://images.unsplash.com/photo-1592432678016-e910b452f9a2?w=800'
  ],
  'https://shopee.co.id/product/678901',
  'https://tokopedia.com/product/678901',
  true
),
(
  'Smartwatch Fitness Tracker',
  'Smartwatch dengan fitur fitness tracking lengkap, monitor detak jantung, dan notifikasi smartphone.',
  'Display: 1.4" AMOLED
Baterai: 7 hari
Fitur: Heart rate, SpO2, sleep tracking, 100+ sport modes
Koneksi: Bluetooth 5.0
Water resistant: IP68
Kompatibel: Android & iOS',
  'Elektronik',
  1200000,
  799000,
  ARRAY[
    'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=800',
    'https://images.unsplash.com/photo-1544117519-31a4b719223d?w=800'
  ],
  'https://shopee.co.id/product/789012',
  'https://tokopedia.com/product/789012',
  true
),
(
  'Tas Ransel Laptop 15.6"',
  'Tas ransel dengan kompartemen laptop hingga 15.6 inch, bahan water resistant dan desain ergonomis.',
  'Kapasitas: 25L
Kompartemen laptop: 15.6"
Material: Polyester water resistant
Fitur: USB charging port, anti-theft pocket
Dimensi: 45 x 30 x 15 cm
Warna: Black, Grey, Navy',
  'Fashion',
  350000,
  249000,
  ARRAY[
    'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800'
  ],
  'https://shopee.co.id/product/890123',
  'https://tokopedia.com/product/890123',
  true
);

-- Verify data
SELECT COUNT(*) as total_products FROM products;
SELECT category, COUNT(*) as count FROM products GROUP BY category;
