// Supabase Configuration
// Replace these with your actual Supabase project credentials
const SUPABASE_URL = 'https://aoithkrnrjyyrcuxsnil.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFvaXRoa3Jucmp5eXJjdXhzbmlsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA1NTE5MzEsImV4cCI6MjA4NjEyNzkzMX0.cYZGaE7zyc5rpB076odUtyE9arvgh1KHoNNEDGNMkFM';

// Initialize Supabase client
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// App Configuration
const APP_CONFIG = {
  // Brand Information (will be loaded from database)
  brandName: 'Your Brand',
  brandTagline: 'Produk Berkualitas Premium',
  brandLogo: 'https://via.placeholder.com/150',
  
  // Social Media Links (will be loaded from database)
  socialMedia: {
    instagram: 'https://instagram.com/yourbrand',
    facebook: 'https://facebook.com/yourbrand',
    tiktok: 'https://tiktok.com/@yourbrand'
  },
  
  // WhatsApp Customer Service (will be loaded from database)
  whatsapp: '6281234567890',
  
  // Marketplace Store Links (will be loaded from database)
  marketplace: {
    shopee: 'https://shopee.co.id/yourbrand',
    tokopedia: 'https://tokopedia.com/yourbrand'
  }
};

// Load settings from database
async function loadSettings() {
  try {
    const { data, error } = await supabase
      .from('settings')
      .select('*');
    
    if (error) throw error;
    
    // Update APP_CONFIG with database values
    data.forEach(setting => {
      switch(setting.key) {
        case 'brand_name':
          APP_CONFIG.brandName = setting.value;
          break;
        case 'brand_tagline':
          APP_CONFIG.brandTagline = setting.value;
          break;
        case 'brand_logo':
          APP_CONFIG.brandLogo = setting.value;
          break;
        case 'instagram_url':
          APP_CONFIG.socialMedia.instagram = setting.value;
          break;
        case 'facebook_url':
          APP_CONFIG.socialMedia.facebook = setting.value;
          break;
        case 'tiktok_url':
          APP_CONFIG.socialMedia.tiktok = setting.value;
          break;
        case 'whatsapp_number':
          APP_CONFIG.whatsapp = setting.value;
          break;
        case 'shopee_store_url':
          APP_CONFIG.marketplace.shopee = setting.value;
          break;
        case 'tokopedia_store_url':
          APP_CONFIG.marketplace.tokopedia = setting.value;
          break;
      }
    });
    
    return APP_CONFIG;
  } catch (error) {
    console.error('Error loading settings:', error);
    return APP_CONFIG;
  }
}
