// ============================================================
//  GramBazaar — shop.js
//  Product filtering, search, rendering
// ============================================================

document.addEventListener('DOMContentLoaded', () => {
  if (!window.GB) return;
  initShop();
});

let activeCategory = 'All';
let searchQuery    = '';
let sortOrder      = 'default';

function initShop() {
  renderCategoryFilters();
  renderProducts(window.GB.PRODUCTS);
  initSearch();
  initSort();
  updateProductCount(window.GB.PRODUCTS.length);
}

/* ─── Category Filter Buttons ────────────────────────────── */
function renderCategoryFilters() {
  const container = document.getElementById('category-filters');
  if (!container) return;

  window.GB.CATEGORIES.forEach(cat => {
    const btn = document.createElement('button');
    btn.className = `filter-btn${cat === 'All' ? ' active' : ''}`;
    btn.textContent = cat;
    btn.addEventListener('click', () => {
      activeCategory = cat;
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      applyFilters();
    });
    container.appendChild(btn);
  });
}

/* ─── Search ─────────────────────────────────────────────── */
function initSearch() {
  const input = document.getElementById('shop-search');
  if (!input) return;
  input.addEventListener('input', (e) => {
    searchQuery = e.target.value.toLowerCase().trim();
    applyFilters();
  });
}

/* ─── Sort ───────────────────────────────────────────────── */
function initSort() {
  const select = document.getElementById('sort-select');
  if (!select) return;
  select.addEventListener('change', (e) => {
    sortOrder = e.target.value;
    applyFilters();
  });
}

/* ─── Filter & Sort Logic ────────────────────────────────── */
function applyFilters() {
  let filtered = [...window.GB.PRODUCTS];

  if (activeCategory !== 'All') {
    filtered = filtered.filter(p => p.category === activeCategory);
  }

  if (searchQuery) {
    filtered = filtered.filter(p =>
      p.name.toLowerCase().includes(searchQuery) ||
      p.artisanName.toLowerCase().includes(searchQuery) ||
      p.village.toLowerCase().includes(searchQuery) ||
      p.tags.some(t => t.includes(searchQuery))
    );
  }

  switch (sortOrder) {
    case 'price-asc':  filtered.sort((a,b) => a.price - b.price); break;
    case 'price-desc': filtered.sort((a,b) => b.price - a.price); break;
    case 'rating':     filtered.sort((a,b) => b.rating - a.rating); break;
    case 'popular':    filtered.sort((a,b) => b.reviews - a.reviews); break;
  }

  renderProducts(filtered);
  updateProductCount(filtered.length);
}

function updateProductCount(count) {
  const el = document.getElementById('product-count');
  if (el) el.textContent = `${count} product${count !== 1 ? 's' : ''} found`;
}

/* ─── Render Products Grid ───────────────────────────────── */
function renderProducts(products) {
  const grid = document.getElementById('products-grid');
  if (!grid) return;

  if (products.length === 0) {
    grid.innerHTML = `
      <div class="empty-state" style="grid-column:1/-1">
        <div class="empty-icon">🔍</div>
        <h3>No products found</h3>
        <p>Try a different search or category</p>
      </div>`;
    return;
  }

  grid.innerHTML = products.map(p => buildProductCard(p)).join('');

  // Bind add-to-cart buttons
  grid.querySelectorAll('.btn-add-cart').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const id = btn.dataset.id;
      const ok = window.GB_CART.addToCart(id);
      if (ok) {
        btn.textContent = '✓ Added';
        btn.classList.add('added');
        setTimeout(() => {
          btn.innerHTML = '🛒 Add';
          btn.classList.remove('added');
        }, 2000);
      }
    });
  });

  // Bind wishlist buttons
  grid.querySelectorAll('.card-wishlist').forEach(btn => {
    btn.addEventListener('click', () => {
      btn.classList.toggle('active');
      btn.textContent = btn.classList.contains('active') ? '♥' : '♡';
    });
  });

  // Re-trigger scroll reveal
  grid.querySelectorAll('.reveal').forEach(el => {
    el.classList.add('visible');
  });
}

function getBadgeClass(badge) {
  const map = {
    'GI Tagged': 'badge-gi',
    'Bestseller': 'badge-best',
    'Eco Friendly': 'badge-eco',
    'Original Art': 'badge-art',
    'One of a Kind': 'badge-unique'
  };
  return map[badge] || 'badge-best';
}

function buildProductCard(p) {
  const pct      = Math.round((p.artisanShare / p.price) * 100);
  const imgSrc   = window.GB.getImagePath(p.image);
  const artisan  = window.GB.ARTISANS.find(a => a.id === p.artisanId);
  const stars    = '★'.repeat(Math.round(p.rating)) + '☆'.repeat(5 - Math.round(p.rating));
  const badgeCls = getBadgeClass(p.badge);

  return `
  <article class="product-card reveal" data-id="${p.id}">
    <div class="card-img">
      ${imgSrc
        ? `<img src="${imgSrc}" alt="${p.name}" loading="lazy">`
        : `<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-size:3rem;background:linear-gradient(135deg,hsl(35,30%,90%),hsl(25,40%,85%))">${getCraftEmoji(p.category)}</div>`
      }
      <span class="card-badge ${badgeCls}">${p.badge}</span>
      <button class="card-wishlist" aria-label="Add to wishlist" title="Wishlist">♡</button>
    </div>
    <div class="card-body">
      <div class="card-artisan">
        <span class="card-artisan-dot"></span>
        <span class="card-artisan-info">
          <strong>${p.artisanName}</strong> · ${p.village}
        </span>
      </div>
      <h3 class="card-title">${p.name}</h3>
      <div class="rating-wrap">
        <span class="stars text-xs">${stars}</span>
        <span class="text-xs text-mid">${p.rating} (${p.reviews})</span>
      </div>
      <div class="profit-bar-wrap" title="${pct}% of your payment goes directly to ${p.artisanName}">
        <div class="profit-bar-label">
          <span class="text-xs">Direct to artisan</span>
          <span class="artisan-pct text-xs">${pct}% · ₹${p.artisanShare.toLocaleString('en-IN')}</span>
        </div>
        <div class="profit-bar">
          <div class="profit-fill" style="width:${pct}%"></div>
        </div>
      </div>
      <div class="card-price-row">
        <div>
          <div class="card-price">₹${p.price.toLocaleString('en-IN')}</div>
          <div class="text-xs text-mid">${p.stock} in stock</div>
        </div>
        <button class="btn-add-cart" data-id="${p.id}" id="add-${p.id}" aria-label="Add ${p.name} to cart">
          🛒 Add
        </button>
      </div>
    </div>
  </article>`;
}

function getCraftEmoji(category) {
  const map = {
    'Textiles': '🧵', 'Pottery': '🏺', 'Jewelry': '💎',
    'Bamboo Crafts': '🌿', 'Paintings': '🎨'
  };
  return map[category] || '🎁';
}
