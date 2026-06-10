-- ============================================
-- EXTENSION
-- ============================================
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- ============================================
-- PRODUCTS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  specifications TEXT,
  category TEXT NOT NULL,
  original_price DECIMAL(10,2) NOT NULL,
  promo_price DECIMAL(10,2) NOT NULL,
  images TEXT[] DEFAULT '{}',
  shopee_link TEXT,
  tokopedia_link TEXT,
  tiktok_link TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT timezone('utc', now()),
  updated_at TIMESTAMPTZ DEFAULT timezone('utc', now())
);

-- ============================================
-- CATEGORIES TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT UNIQUE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT timezone('utc', now())
);

-- ============================================
-- SETTINGS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key TEXT UNIQUE NOT NULL,
  value TEXT NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT timezone('utc', now())
);

-- ============================================
-- DEFAULT SETTINGS
-- ============================================
INSERT INTO settings (key, value)
VALUES
('brand_name', 'Your Brand'),
('brand_tagline', 'Produk Berkualitas Premium'),
('brand_logo', 'https://via.placeholder.com/150'),
('instagram_url', 'https://www.instagram.com/dna.market.id?igsh=eDhvYTB6OWZncWd4'),
('facebook_url', 'https://facebook.com/yourbrand'),
('tiktok_url', 'https://tiktok.com/@yourbrand'),
('whatsapp_number', '6283862644911'),
('shopee_store_url', 'https://shopee.co.id/yourbrand'),
('tokopedia_store_url', 'https://tokopedia.com/yourbrand')
ON CONFLICT (key) DO NOTHING;

-- ============================================
-- DEFAULT CATEGORIES
-- ============================================
INSERT INTO categories (name)
VALUES
('Elektronik'),
('Fashion'),
('Aksesoris'),
('Peralatan Rumah'),
('Lainnya')
ON CONFLICT (name) DO NOTHING;

-- ============================================
-- UPDATE TIMESTAMP FUNCTION
-- ============================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER
AS $$
BEGIN
  NEW.updated_at = timezone('utc', now());
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- ============================================
-- TRIGGERS
-- ============================================
DROP TRIGGER IF EXISTS update_products_updated_at ON products;

CREATE TRIGGER update_products_updated_at
BEFORE UPDATE ON products
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_settings_updated_at ON settings;

CREATE TRIGGER update_settings_updated_at
BEFORE UPDATE ON settings
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- ENABLE RLS
-- ============================================
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE settings ENABLE ROW LEVEL SECURITY;

-- ============================================
-- REMOVE OLD POLICIES
-- ============================================
DROP POLICY IF EXISTS "Public can view active products" ON products;
DROP POLICY IF EXISTS "Public can view categories" ON categories;
DROP POLICY IF EXISTS "Public can view settings" ON settings;

DROP POLICY IF EXISTS "Authenticated users can insert products" ON products;
DROP POLICY IF EXISTS "Authenticated users can update products" ON products;
DROP POLICY IF EXISTS "Authenticated users can delete products" ON products;
DROP POLICY IF EXISTS "Authenticated users can view all products" ON products;

DROP POLICY IF EXISTS "Authenticated users can manage categories" ON categories;
DROP POLICY IF EXISTS "Authenticated users can manage settings" ON settings;

-- ============================================
-- PUBLIC POLICIES
-- ============================================
CREATE POLICY "Public can view active products"
ON products
FOR SELECT
USING (is_active = true);

CREATE POLICY "Public can view categories"
ON categories
FOR SELECT
USING (true);

CREATE POLICY "Public can view settings"
ON settings
FOR SELECT
USING (true);

-- ============================================
-- ADMIN PRODUCT POLICIES
-- ============================================
CREATE POLICY "Authenticated users can insert products"
ON products
FOR INSERT
WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update products"
ON products
FOR UPDATE
USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete products"
ON products
FOR DELETE
USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can view all products"
ON products
FOR SELECT
USING (auth.role() = 'authenticated');

-- ============================================
-- ADMIN CATEGORY POLICIES
-- ============================================
CREATE POLICY "Authenticated users can manage categories"
ON categories
FOR ALL
USING (auth.role() = 'authenticated');

-- ============================================
-- ADMIN SETTINGS POLICIES
-- ============================================
CREATE POLICY "Authenticated users can manage settings"
ON settings
FOR ALL
USING (auth.role() = 'authenticated');

-- ============================================
-- STORAGE BUCKET
-- ============================================
INSERT INTO storage.buckets (id, name, public)
VALUES (
  'product-images',
  'product-images',
  true
)
ON CONFLICT (id) DO NOTHING;

-- ============================================
-- REMOVE OLD STORAGE POLICIES
-- ============================================
DROP POLICY IF EXISTS "Public can view product images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can upload product images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can update product images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can delete product images" ON storage.objects;

-- ============================================
-- STORAGE POLICIES
-- ============================================
CREATE POLICY "Public can view product images"
ON storage.objects
FOR SELECT
USING (bucket_id = 'product-images');

CREATE POLICY "Authenticated users can upload product images"
ON storage.objects
FOR INSERT
WITH CHECK (
  bucket_id = 'product-images'
  AND auth.role() = 'authenticated'
);

CREATE POLICY "Authenticated users can update product images"
ON storage.objects
FOR UPDATE
USING (
  bucket_id = 'product-images'
  AND auth.role() = 'authenticated'
);

CREATE POLICY "Authenticated users can delete product images"
ON storage.objects
FOR DELETE
USING (
  bucket_id = 'product-images'
  AND auth.role() = 'authenticated'
);
