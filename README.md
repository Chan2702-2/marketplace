# Marketplace Landing Page

Modern, clean, and premium marketplace landing page with admin panel.

## 🎨 Features

- **Modern Design**: Blue-purple gradient theme with soft shadows
- **Social Media Integration**: Instagram, Facebook, TikTok links
- **Marketplace Links**: Direct links to Shopee & Tokopedia stores
- **Product Catalog**: Filterable product grid with categories
- **Product Details**: Modal view with image carousel
- **Floating WhatsApp**: Customer service button
- **Admin Panel**: Secure CRUD operations for products
- **Mobile Responsive**: Mobile-first design

## 🚀 Tech Stack

- **Frontend**: HTML5, Tailwind CSS, Vanilla JavaScript
- **Backend**: Supabase (Database + Authentication)
- **Hosting**: Vercel-ready

## 📦 Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Supabase

1. Create a Supabase project at [supabase.com](https://supabase.com)
2. Copy your project URL and anon key
3. Update `js/config.js` with your credentials:

```javascript
const SUPABASE_URL = 'your-project-url';
const SUPABASE_ANON_KEY = 'your-anon-key';
```

### 3. Set Up Database

Run the SQL schema in Supabase SQL Editor (see `supabase-schema.sql`)

### 4. Configure Settings

Edit `js/config.js` to set:
- Brand name
- Social media links
- WhatsApp number
- Marketplace store links

### 5. Run Development Server

```bash
npm run dev
```

Or simply open `index.html` in your browser.

## 🔐 Admin Access

1. Navigate to `/admin.html`
2. Default credentials (change after first login):
   - Email: admin@example.com
   - Password: admin123

## 📱 Usage

### For Customers
- Browse products by category
- Click product cards to view details
- Click "Beli di Shopee/Tokopedia" to purchase
- Contact via floating WhatsApp button

### For Admin
- Login to admin panel
- Add/edit/delete products
- Upload product images
- Set prices and discounts
- Manage categories
- Toggle product visibility

## 🌐 Deployment

### Vercel Deployment

1. Push code to GitHub
2. Import project in Vercel
3. Deploy (no build configuration needed)

## 📝 License

MIT License
