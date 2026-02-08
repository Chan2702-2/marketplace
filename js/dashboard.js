// Global variables
let allProducts = [];
let allCategories = [];
let currentProductImages = [];
let editingProductId = null;

// Check authentication
supabase.auth.getSession().then(({ data: { session } }) => {
  if (!session) {
    window.location.href = 'admin.html';
  } else {
    initDashboard();
  }
});

// Initialize dashboard
async function initDashboard() {
  await loadCategories();
  await loadProducts();
  await loadSettings();
  updateStats();
}

// Logout
async function logout() {
  await supabase.auth.signOut();
  window.location.href = 'admin.html';
}

// Load categories
async function loadCategories() {
  try {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('name');
    
    if (error) throw error;
    
    allCategories = data || [];
    updateCategorySelects();
  } catch (error) {
    console.error('Error loading categories:', error);
    alert('Gagal memuat kategori');
  }
}

// Update category selects
function updateCategorySelects() {
  const select = document.getElementById('productCategory');
  select.innerHTML = '<option value="">Pilih Kategori</option>';
  
  allCategories.forEach(category => {
    const option = document.createElement('option');
    option.value = category.name;
    option.textContent = category.name;
    select.appendChild(option);
  });
}

// Load products
async function loadProducts() {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    
    allProducts = data || [];
    renderProductsTable();
  } catch (error) {
    console.error('Error loading products:', error);
    alert('Gagal memuat produk');
  }
}

// Render products table
function renderProductsTable() {
  const tbody = document.getElementById('productsTableBody');
  const emptyState = document.getElementById('emptyState');
  
  if (allProducts.length === 0) {
    tbody.innerHTML = '';
    emptyState.classList.remove('hidden');
    return;
  }
  
  emptyState.classList.add('hidden');
  tbody.innerHTML = '';
  
  allProducts.forEach(product => {
    const row = document.createElement('tr');
    row.className = 'hover:bg-gray-50';
    
    const imageUrl = product.images && product.images.length > 0 
      ? product.images[0] 
      : 'https://via.placeholder.com/100';
    
    row.innerHTML = `
      <td class="px-6 py-4">
        <img src="${imageUrl}" alt="${product.name}" class="w-16 h-16 object-cover rounded-lg">
      </td>
      <td class="px-6 py-4">
        <p class="font-semibold text-gray-800">${product.name}</p>
      </td>
      <td class="px-6 py-4">
        <span class="badge bg-blue-100 text-blue-800">${product.category}</span>
      </td>
      <td class="px-6 py-4">
        <p class="text-sm text-gray-500 line-through">Rp ${formatPrice(product.original_price)}</p>
        <p class="font-bold text-red-600">Rp ${formatPrice(product.promo_price)}</p>
      </td>
      <td class="px-6 py-4">
        <span class="badge ${product.is_active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}">
          ${product.is_active ? 'Aktif' : 'Nonaktif'}
        </span>
      </td>
      <td class="px-6 py-4">
        <div class="flex gap-2">
          <button onclick="editProduct('${product.id}')" class="text-blue-600 hover:text-blue-800">
            <i class="fas fa-edit"></i>
          </button>
          <button onclick="deleteProduct('${product.id}')" class="text-red-600 hover:text-red-800">
            <i class="fas fa-trash"></i>
          </button>
        </div>
      </td>
    `;
    
    tbody.appendChild(row);
  });
}

// Format price
function formatPrice(price) {
  return new Intl.NumberFormat('id-ID').format(price);
}

// Update stats
function updateStats() {
  document.getElementById('totalProducts').textContent = allProducts.length;
  document.getElementById('activeProducts').textContent = allProducts.filter(p => p.is_active).length;
  document.getElementById('totalCategories').textContent = allCategories.length;
}

// Open add product modal
function openAddProductModal() {
  editingProductId = null;
  document.getElementById('modalTitle').textContent = 'Tambah Produk';
  document.getElementById('productForm').reset();
  currentProductImages = [];
  document.getElementById('imagePreviewContainer').innerHTML = '';
  document.getElementById('productModal').classList.add('active');
  document.body.style.overflow = 'hidden';
}

// Close product modal
function closeProductModal() {
  document.getElementById('productModal').classList.remove('active');
  document.body.style.overflow = 'auto';
}

// Edit product
async function editProduct(productId) {
  const product = allProducts.find(p => p.id === productId);
  if (!product) return;
  
  editingProductId = productId;
  document.getElementById('modalTitle').textContent = 'Edit Produk';
  
  // Fill form
  document.getElementById('productId').value = product.id;
  document.getElementById('productName').value = product.name;
  document.getElementById('productCategory').value = product.category;
  document.getElementById('productOriginalPrice').value = product.original_price;
  document.getElementById('productPromoPrice').value = product.promo_price;
  document.getElementById('productDescription').value = product.description || '';
  document.getElementById('productSpecifications').value = product.specifications || '';
  document.getElementById('productShopeeLink').value = product.shopee_link || '';
  document.getElementById('productTokopediaLink').value = product.tokopedia_link || '';
  document.getElementById('productIsActive').checked = product.is_active;
  
  // Set images
  currentProductImages = product.images || [];
  renderImagePreviews();
  
  // Open modal
  document.getElementById('productModal').classList.add('active');
  document.body.style.overflow = 'hidden';
}

// Delete product
async function deleteProduct(productId) {
  if (!confirm('Apakah Anda yakin ingin menghapus produk ini?')) return;
  
  try {
    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', productId);
    
    if (error) throw error;
    
    alert('Produk berhasil dihapus');
    await loadProducts();
    updateStats();
  } catch (error) {
    console.error('Error deleting product:', error);
    alert('Gagal menghapus produk');
  }
}

// Add image URL
function addImageUrl() {
  const input = document.getElementById('imageUrlInput');
  const url = input.value.trim();
  
  if (!url) {
    alert('Masukkan URL gambar');
    return;
  }
  
  currentProductImages.push(url);
  input.value = '';
  renderImagePreviews();
}

// Remove image
function removeImage(index) {
  currentProductImages.splice(index, 1);
  renderImagePreviews();
}

// Render image previews
function renderImagePreviews() {
  const container = document.getElementById('imagePreviewContainer');
  container.innerHTML = '';
  
  currentProductImages.forEach((url, index) => {
    const preview = document.createElement('div');
    preview.className = 'image-preview';
    preview.innerHTML = `
      <img src="${url}" alt="Preview ${index + 1}">
      <div class="remove-btn" onclick="removeImage(${index})">
        <i class="fas fa-times"></i>
      </div>
    `;
    container.appendChild(preview);
  });
}

// Handle product form submit
document.getElementById('productForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const productData = {
    name: document.getElementById('productName').value,
    category: document.getElementById('productCategory').value,
    original_price: parseFloat(document.getElementById('productOriginalPrice').value),
    promo_price: parseFloat(document.getElementById('productPromoPrice').value),
    description: document.getElementById('productDescription').value,
    specifications: document.getElementById('productSpecifications').value,
    shopee_link: document.getElementById('productShopeeLink').value,
    tokopedia_link: document.getElementById('productTokopediaLink').value,
    images: currentProductImages,
    is_active: document.getElementById('productIsActive').checked
  };
  
  try {
    if (editingProductId) {
      // Update existing product
      const { error } = await supabase
        .from('products')
        .update(productData)
        .eq('id', editingProductId);
      
      if (error) throw error;
      alert('Produk berhasil diupdate');
    } else {
      // Insert new product
      const { error } = await supabase
        .from('products')
        .insert([productData]);
      
      if (error) throw error;
      alert('Produk berhasil ditambahkan');
    }
    
    closeProductModal();
    await loadProducts();
    updateStats();
  } catch (error) {
    console.error('Error saving product:', error);
    alert('Gagal menyimpan produk: ' + error.message);
  }
});

// Categories Modal
function openCategoriesModal() {
  renderCategoriesList();
  document.getElementById('categoriesModal').classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeCategoriesModal() {
  document.getElementById('categoriesModal').classList.remove('active');
  document.body.style.overflow = 'auto';
}

function renderCategoriesList() {
  const list = document.getElementById('categoriesList');
  list.innerHTML = '';
  
  allCategories.forEach(category => {
    const item = document.createElement('div');
    item.className = 'flex justify-between items-center p-3 bg-gray-50 rounded-lg';
    item.innerHTML = `
      <span class="font-semibold text-gray-800">${category.name}</span>
      <button onclick="deleteCategory('${category.id}')" class="text-red-600 hover:text-red-800">
        <i class="fas fa-trash"></i>
      </button>
    `;
    list.appendChild(item);
  });
}

async function addCategory() {
  const name = document.getElementById('newCategoryName').value.trim();
  
  if (!name) {
    alert('Masukkan nama kategori');
    return;
  }
  
  try {
    const { error } = await supabase
      .from('categories')
      .insert([{ name }]);
    
    if (error) throw error;
    
    document.getElementById('newCategoryName').value = '';
    await loadCategories();
    renderCategoriesList();
    updateStats();
  } catch (error) {
    console.error('Error adding category:', error);
    alert('Gagal menambahkan kategori');
  }
}

async function deleteCategory(categoryId) {
  if (!confirm('Apakah Anda yakin ingin menghapus kategori ini?')) return;
  
  try {
    const { error } = await supabase
      .from('categories')
      .delete()
      .eq('id', categoryId);
    
    if (error) throw error;
    
    await loadCategories();
    renderCategoriesList();
    updateStats();
  } catch (error) {
    console.error('Error deleting category:', error);
    alert('Gagal menghapus kategori');
  }
}

// Settings Modal
function openSettingsModal() {
  loadSettingsForm();
  document.getElementById('settingsModal').classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeSettingsModal() {
  document.getElementById('settingsModal').classList.remove('active');
  document.body.style.overflow = 'auto';
}

async function loadSettings() {
  try {
    const { data, error } = await supabase
      .from('settings')
      .select('*');
    
    if (error) throw error;
    
    return data;
  } catch (error) {
    console.error('Error loading settings:', error);
    return [];
  }
}

async function loadSettingsForm() {
  const settings = await loadSettings();
  
  settings.forEach(setting => {
    switch(setting.key) {
      case 'brand_name':
        document.getElementById('settingBrandName').value = setting.value;
        break;
      case 'brand_tagline':
        document.getElementById('settingBrandTagline').value = setting.value;
        break;
      case 'brand_logo':
        document.getElementById('settingBrandLogo').value = setting.value;
        break;
      case 'instagram_url':
        document.getElementById('settingInstagram').value = setting.value;
        break;
      case 'facebook_url':
        document.getElementById('settingFacebook').value = setting.value;
        break;
      case 'tiktok_url':
        document.getElementById('settingTiktok').value = setting.value;
        break;
      case 'whatsapp_number':
        document.getElementById('settingWhatsapp').value = setting.value;
        break;
      case 'shopee_store_url':
        document.getElementById('settingShopee').value = setting.value;
        break;
      case 'tokopedia_store_url':
        document.getElementById('settingTokopedia').value = setting.value;
        break;
    }
  });
}

// Handle settings form submit
document.getElementById('settingsForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const updates = [
    { key: 'brand_name', value: document.getElementById('settingBrandName').value },
    { key: 'brand_tagline', value: document.getElementById('settingBrandTagline').value },
    { key: 'brand_logo', value: document.getElementById('settingBrandLogo').value },
    { key: 'instagram_url', value: document.getElementById('settingInstagram').value },
    { key: 'facebook_url', value: document.getElementById('settingFacebook').value },
    { key: 'tiktok_url', value: document.getElementById('settingTiktok').value },
    { key: 'whatsapp_number', value: document.getElementById('settingWhatsapp').value },
    { key: 'shopee_store_url', value: document.getElementById('settingShopee').value },
    { key: 'tokopedia_store_url', value: document.getElementById('settingTokopedia').value }
  ];
  
  try {
    for (const update of updates) {
      const { error } = await supabase
        .from('settings')
        .update({ value: update.value })
        .eq('key', update.key);
      
      if (error) throw error;
    }
    
    alert('Pengaturan berhasil disimpan');
    closeSettingsModal();
  } catch (error) {
    console.error('Error saving settings:', error);
    alert('Gagal menyimpan pengaturan');
  }
});

// Close modals on outside click
document.querySelectorAll('.modal').forEach(modal => {
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.remove('active');
      document.body.style.overflow = 'auto';
    }
  });
});
