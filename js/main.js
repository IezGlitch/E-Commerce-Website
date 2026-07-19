// ============================================================
//  GramBazaar — main.js
//  Global logic: navbar, cart badge, scroll animations, toast
// ============================================================

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initCartBadge();
  initScrollReveal();
  initToastContainer();
  markActiveNavLink();
});

/* ─── Navbar ─────────────────────────────────────────────── */
function initNavbar() {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;

  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 20);
  }, { passive: true });

  // Mobile hamburger
  const hamburger = document.querySelector('.nav-hamburger');
  const navLinks  = document.querySelector('.nav-links');
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('nav-open');
      hamburger.setAttribute('aria-expanded', isOpen);
    });
  }
}

function markActiveNavLink() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(link => {
    const href = link.getAttribute('href');
    if (href && (href === currentPage || href.endsWith(currentPage))) {
      link.classList.add('active');
    }
  });
}

/* ─── Cart Badge ─────────────────────────────────────────── */
function initCartBadge() {
  updateCartBadge();
}

function updateCartBadge() {
  const cart = getCart();
  const count = cart.reduce((sum, item) => sum + item.qty, 0);
  document.querySelectorAll('.cart-badge').forEach(badge => {
    badge.textContent = count;
    badge.classList.toggle('show', count > 0);
  });
}

/* ─── Cart Utilities (localStorage) ─────────────────────── */
function getCart() {
  try { return JSON.parse(localStorage.getItem('gb_cart') || '[]'); }
  catch { return []; }
}

function saveCart(cart) {
  localStorage.setItem('gb_cart', JSON.stringify(cart));
  updateCartBadge();
}

function addToCart(productId, qty = 1) {
  const products = window.GB?.PRODUCTS || [];
  const product  = products.find(p => p.id === productId);
  if (!product) return false;

  const cart = getCart();
  const existing = cart.find(item => item.id === productId);

  if (existing) {
    existing.qty += qty;
  } else {
    cart.push({
      id: productId,
      name: product.name,
      price: product.price,
      artisanName: product.artisanName,
      village: product.village,
      image: product.image,
      artisanShare: product.artisanShare,
      qty
    });
  }

  saveCart(cart);
  showToast(`🛒 "${product.name}" added to cart!`, 'success');
  return true;
}

function removeFromCart(productId) {
  const cart = getCart().filter(item => item.id !== productId);
  saveCart(cart);
}

function updateQty(productId, qty) {
  const cart = getCart();
  const item = cart.find(i => i.id === productId);
  if (item) {
    item.qty = Math.max(1, qty);
    saveCart(cart);
  }
}

function clearCart() {
  saveCart([]);
}

/* ─── Toast Notifications ────────────────────────────────── */
function initToastContainer() {
  if (!document.querySelector('.toast-container')) {
    const el = document.createElement('div');
    el.className = 'toast-container';
    el.id = 'toast-container';
    document.body.appendChild(el);
  }
}

function showToast(message, type = 'default', duration = 3000) {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const icons = { success: '✅', error: '❌', default: 'ℹ️' };
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `<span>${icons[type] || icons.default}</span><span>${message}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.classList.add('removing');
    setTimeout(() => toast.remove(), 320);
  }, duration);
}

/* ─── Scroll Reveal ──────────────────────────────────────── */
function initScrollReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

/* ─── Image Path Helper ──────────────────────────────────── */
function getImageSrc(key) {
  return window.GB?.getImagePath(key) || '';
}

/* ─── Profit Bar Renderer ────────────────────────────────── */
function renderProfitBar(artisanShare, totalPrice) {
  const pct = Math.round((artisanShare / totalPrice) * 100);
  return `
    <div class="profit-bar-wrap">
      <div class="profit-bar-label">
        <span>Artisan earns</span>
        <span class="artisan-pct">${pct}% · ₹${artisanShare.toLocaleString('en-IN')}</span>
      </div>
      <div class="profit-bar">
        <div class="profit-fill" style="width:${pct}%"></div>
      </div>
    </div>`;
}

/* ─── Expose globals ─────────────────────────────────────── */
window.GB_CART = {
  getCart, saveCart, addToCart, removeFromCart, updateQty, clearCart
};
window.showToast  = showToast;
window.getImageSrc = getImageSrc;
window.renderProfitBar = renderProfitBar;
window.updateCartBadge = updateCartBadge;
