// Dummy loadSettings function to prevent ReferenceError
async function loadSettings() {
  // You can implement loading settings from DB here if needed
  return;
}
// Global variables
let allProducts = [];
let allCategories = [];
let currentCategory = 'all';
let currentCarouselIndex = 0;
let currentProductImages = [];

// Initialize app
document.addEventListener('DOMContentLoaded', async () => {
  await loadSettings();
  await loadCategories();
  await loadProducts();
  updateUI();
});

// Update UI with settings
function updateUI() {
  document.getElementById('brandName').textContent = APP_CONFIG.brandName;
  document.getElementById('brandTagline').textContent = APP_CONFIG.brandTagline;
  document.getElementById('brandLogo').src = APP_CONFIG.brandLogo;
  document.getElementById('footerBrandName').textContent = APP_CONFIG.brandName;
  
  document.getElementById('instagramLink').href = APP_CONFIG.socialMedia.instagram;
  document.getElementById('facebookLink').href = APP_CONFIG.socialMedia.facebook;
  document.getElementById('tiktokLink').href = APP_CONFIG.socialMedia.tiktok;
  
  document.getElementById('shopeeLink').href = APP_CONFIG.marketplace.shopee;
  document.getElementById('tokopediaLink').href = APP_CONFIG.marketplace.tokopedia;
  
  const whatsappUrl = `https://wa.me/${APP_CONFIG.whatsapp}?text=Halo, saya tertarik dengan produk Anda`;
  document.getElementById('whatsappButton').href = whatsappUrl;
  
  document.title = `${APP_CONFIG.brandName} - Marketplace`;
}

// Load categories from database
async function loadCategories() {
  try {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('name');
    
    if (error) throw error;
    
    allCategories = data || [];
    renderCategories();
  } catch (error) {
    console.error('Error loading categories:', error);
  }
}

// Render categories
function renderCategories() {
  const container = document.getElementById('categoriesContainer');
  
  // Clear existing categories except "Semua Produk"
  const allButton = container.querySelector('[data-category="all"]');
  container.innerHTML = '';
  container.appendChild(allButton);
  
  // Add category buttons
  allCategories.forEach(category => {
    const button = document.createElement('button');
    button.className = 'badge bg-gray-200 text-gray-700 cursor-pointer hover:shadow-lg transition-all';
    button.textContent = category.name;
    button.dataset.category = category.name;
    button.onclick = () => filterByCategory(category.name);
    container.appendChild(button);
  });
  
  // Set active category
  updateActiveCategoryButton();
}

// Filter products by category
function filterByCategory(category) {
  currentCategory = category;
  updateActiveCategoryButton();
  renderProducts();
}

// Update active category button style
function updateActiveCategoryButton() {
  const buttons = document.querySelectorAll('#categoriesContainer button');
  buttons.forEach(btn => {
    if (btn.dataset.category === currentCategory) {
      btn.className = 'badge bg-gradient-to-r from-blue-500 to-purple-600 text-white cursor-pointer hover:shadow-lg transition-all';
    } else {
      btn.className = 'badge bg-gray-200 text-gray-700 cursor-pointer hover:shadow-lg transition-all';
    }
  });
}

// Load products from database
async function loadProducts() {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('is_active', true)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    
    allProducts = data || [];
    renderProducts();
  } catch (error) {
    console.error('Error loading products:', error);
    showEmptyState();
  }
}

// Render products
function renderProducts() {
  const grid = document.getElementById('productsGrid');
  const loading = document.getElementById('loadingState');
  const empty = document.getElementById('emptyState');
  
  // Filter products by category
  const filteredProducts = currentCategory === 'all' 
    ? allProducts 
    : allProducts.filter(p => p.category === currentCategory);
  
  // Hide loading
  loading.classList.add('hidden');
  
  // Show empty state if no products
  if (filteredProducts.length === 0) {
    grid.classList.add('hidden');
    empty.classList.remove('hidden');
    return;
  }
  
  // Show products
  empty.classList.add('hidden');
  grid.classList.remove('hidden');
  
  // Clear grid
  grid.innerHTML = '';
  
  // Render product cards
  filteredProducts.forEach(product => {
    const card = createProductCard(product);
    grid.appendChild(card);
  });
}

// Create product card
function createProductCard(product) {
  const card = document.createElement('div');
  card.className = 'bg-white rounded-2xl overflow-hidden shadow-lg card-hover cursor-pointer';
  card.onclick = () => openProductModal(product);
  
  const imageUrl = product.images && product.images.length > 0 
    ? product.images[0] 
    : 'https://via.placeholder.com/400x300?text=No+Image';
  
  card.innerHTML = `
    <div class="relative">
      <img src="${imageUrl}" alt="${product.name}" class="w-full h-48 object-cover">
      <span class="badge bg-blue-500 text-white absolute top-3 left-3">${product.category}</span>
    </div>
    <div class="p-4">
      <h3 class="font-bold text-lg text-gray-800 mb-2 line-clamp-2">${product.name}</h3>
      <div class="mb-3">
        <p class="price-original">Rp ${formatPrice(product.original_price)}</p>
        <p class="price-promo">Rp ${formatPrice(product.promo_price)}</p>
      </div>
      <div class="flex gap-2">
        <button onclick="event.stopPropagation(); window.open('${product.shopee_link || '#'}', '_blank')" 
                class="flex-1 bg-orange-500 text-white text-sm py-2 px-3 rounded-lg hover:bg-orange-600 transition-colors ${!product.shopee_link ? 'opacity-50 cursor-not-allowed' : ''}">
          <i class="fas fa-shopping-bag mr-1"></i> Shopee
        </button>
        <button onclick="event.stopPropagation(); window.open('${product.tokopedia_link || '#'}', '_blank')" 
                class="flex-1 bg-green-500 text-white text-sm py-2 px-3 rounded-lg hover:bg-green-600 transition-colors ${!product.tokopedia_link ? 'opacity-50 cursor-not-allowed' : ''}">
          <i class="fas fa-store mr-1"></i> Tokped
        </button>
      </div>
    </div>
  `;
  
  return card;
}

// Format price
function formatPrice(price) {
  return new Intl.NumberFormat('id-ID').format(price);
}

// Show empty state
function showEmptyState() {
  document.getElementById('loadingState').classList.add('hidden');
  document.getElementById('productsGrid').classList.add('hidden');
  document.getElementById('emptyState').classList.remove('hidden');
}

// Open product modal
function openProductModal(product) {
  const modal = document.getElementById('productModal');
  
  // Set product data
  document.getElementById('modalCategory').textContent = product.category;
  document.getElementById('modalName').textContent = product.name;
  document.getElementById('modalOriginalPrice').textContent = `Rp ${formatPrice(product.original_price)}`;
  document.getElementById('modalPromoPrice').textContent = `Rp ${formatPrice(product.promo_price)}`;
  document.getElementById('modalDescription').textContent = product.description || 'Tidak ada deskripsi';
  document.getElementById('modalSpecifications').textContent = product.specifications || 'Tidak ada spesifikasi';
  
  // Set marketplace links
  document.getElementById('modalShopeeLink').href = product.shopee_link || '#';
  document.getElementById('modalTokopediaLink').href = product.tokopedia_link || '#';
  
  // Set images
  currentProductImages = product.images && product.images.length > 0 
    ? product.images 
    : ['https://via.placeholder.com/600x400?text=No+Image'];
  currentCarouselIndex = 0;
  renderCarousel();
  
  // Show modal
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

// Close modal
function closeModal() {
  const modal = document.getElementById('productModal');
  modal.classList.remove('active');
  document.body.style.overflow = 'auto';
}

// Render carousel
function renderCarousel() {
  const carousel = document.getElementById('modalCarousel');
  const dots = document.getElementById('carouselDots');
  
  // Clear carousel
  carousel.innerHTML = '';
  dots.innerHTML = '';
  
  // Add images
  currentProductImages.forEach((image, index) => {
    const img = document.createElement('img');
    img.src = image;
    img.alt = `Product image ${index + 1}`;
    img.className = 'w-full h-80 object-cover';
    carousel.appendChild(img);
    
    // Add dot
    const dot = document.createElement('button');
    dot.className = `w-2 h-2 rounded-full transition-all ${index === currentCarouselIndex ? 'bg-blue-600 w-6' : 'bg-gray-300'}`;
    dot.onclick = () => goToImage(index);
    dots.appendChild(dot);
  });
  
  // Update carousel position
  updateCarouselPosition();
}

// Update carousel position
function updateCarouselPosition() {
  const carousel = document.getElementById('modalCarousel');
  carousel.style.transform = `translateX(-${currentCarouselIndex * 100}%)`;
  
  // Update dots
  const dots = document.querySelectorAll('#carouselDots button');
  dots.forEach((dot, index) => {
    if (index === currentCarouselIndex) {
      dot.className = 'w-6 h-2 rounded-full bg-blue-600 transition-all';
    } else {
      dot.className = 'w-2 h-2 rounded-full bg-gray-300 transition-all';
    }
  });
}

// Previous image
function prevImage() {
  if (currentCarouselIndex > 0) {
    currentCarouselIndex--;
    updateCarouselPosition();
  }
}

// Next image
function nextImage() {
  if (currentCarouselIndex < currentProductImages.length - 1) {
    currentCarouselIndex++;
    updateCarouselPosition();
  }
}

// Go to specific image
function goToImage(index) {
  currentCarouselIndex = index;
  updateCarouselPosition();
}

// Close modal on outside click
document.getElementById('productModal').addEventListener('click', (e) => {
  if (e.target.id === 'productModal') {
    closeModal();
  }
});

// Close modal on escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeModal();
  }
});
