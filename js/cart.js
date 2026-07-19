// ============================================================
//  GramBazaar — cart.js
//  Cart page rendering and checkout flow
// ============================================================

document.addEventListener('DOMContentLoaded', () => {
  renderCart();
});

function renderCart() {
  const cart = window.GB_CART.getCart();
  const container = document.getElementById('cart-items');
  const summaryEl = document.getElementById('cart-summary');
  if (!container) return;

  if (cart.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <div class="empty-icon">🛒</div>
        <h3>Your cart is empty</h3>
        <p>Visit our marketplace and support rural artisans!</p>
        <a href="shop.html" class="btn btn-primary mt-24">Browse Products</a>
      </div>`;
    if (summaryEl) summaryEl.style.display = 'none';
    return;
  }

  container.innerHTML = cart.map(item => buildCartItem(item)).join('');
  if (summaryEl) summaryEl.style.display = 'block';
  renderSummary(cart);
  bindCartActions();
}

function buildCartItem(item) {
  const imgSrc = window.GB?.getImagePath(item.image) || '';
  const pct = Math.round((item.artisanShare / item.price) * 100);

  return `
  <div class="cart-item" data-id="${item.id}">
    <div class="cart-item-img">
      ${imgSrc
        ? `<img src="${imgSrc}" alt="${item.name}">`
        : `<div class="cart-img-placeholder">🎁</div>`}
    </div>
    <div class="cart-item-info">
      <h4 class="cart-item-name">${item.name}</h4>
      <p class="cart-item-meta">By <strong>${item.artisanName}</strong> · ${item.village}</p>
      <div class="cart-profit-bar">
        <span class="text-xs" style="color:var(--secondary)">Artisan earns ${pct}% (₹${item.artisanShare.toLocaleString('en-IN')} per unit)</span>
      </div>
    </div>
    <div class="cart-item-controls">
      <div class="qty-ctrl">
        <button class="qty-btn qty-dec" data-id="${item.id}" aria-label="Decrease quantity">−</button>
        <span class="qty-val" id="qty-${item.id}">${item.qty}</span>
        <button class="qty-btn qty-inc" data-id="${item.id}" aria-label="Increase quantity">+</button>
      </div>
      <div class="cart-item-price">₹${(item.price * item.qty).toLocaleString('en-IN')}</div>
      <button class="cart-remove" data-id="${item.id}" aria-label="Remove item" title="Remove">✕</button>
    </div>
  </div>`;
}

function renderSummary(cart) {
  const subtotal = cart.reduce((sum, i) => sum + (i.price * i.qty), 0);
  const totalArtisanShare = cart.reduce((sum, i) => sum + (i.artisanShare * i.qty), 0);
  const platformFee = subtotal - totalArtisanShare;
  const shipping = subtotal >= 1500 ? 0 : 99;
  const total = subtotal + shipping;
  const artisanPct = Math.round((totalArtisanShare / subtotal) * 100);

  const el = document.getElementById('cart-summary-content');
  if (!el) return;

  el.innerHTML = `
    <div class="summary-row">
      <span>Subtotal</span>
      <span>₹${subtotal.toLocaleString('en-IN')}</span>
    </div>
    <div class="summary-row">
      <span>Shipping</span>
      <span>${shipping === 0 ? '<span style="color:var(--secondary);font-weight:600">FREE</span>' : '₹' + shipping}</span>
    </div>
    ${shipping > 0 ? `<div class="summary-note">Add ₹${(1500 - subtotal).toLocaleString('en-IN')} more for free shipping</div>` : ''}
    <div class="summary-divider"></div>
    <div class="summary-row summary-total">
      <span>Total</span>
      <span>₹${total.toLocaleString('en-IN')}</span>
    </div>
    <div class="artisan-impact-box">
      <div class="impact-icon">🌾</div>
      <div>
        <strong>₹${totalArtisanShare.toLocaleString('en-IN')} goes directly to artisans</strong>
        <p>${artisanPct}% of your order supports rural makers directly — no middlemen!</p>
      </div>
    </div>
    <button class="btn btn-primary w-full" id="checkout-btn" onclick="handleCheckout()">
      Proceed to Checkout →
    </button>
    <a href="shop.html" class="btn btn-outline w-full mt-8" style="justify-content:center">
      Continue Shopping
    </a>`;
}

function bindCartActions() {
  document.querySelectorAll('.qty-inc').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.id;
      const cart = window.GB_CART.getCart();
      const item = cart.find(i => i.id === id);
      if (item) {
        window.GB_CART.updateQty(id, item.qty + 1);
        renderCart();
      }
    });
  });

  document.querySelectorAll('.qty-dec').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.id;
      const cart = window.GB_CART.getCart();
      const item = cart.find(i => i.id === id);
      if (item && item.qty > 1) {
        window.GB_CART.updateQty(id, item.qty - 1);
        renderCart();
      }
    });
  });

  document.querySelectorAll('.cart-remove').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.id;
      window.GB_CART.removeFromCart(id);
      const cartItem = document.querySelector(`.cart-item[data-id="${id}"]`);
      if (cartItem) {
        cartItem.style.opacity = '0';
        cartItem.style.transform = 'translateX(-20px)';
        cartItem.style.transition = 'all 0.3s ease';
        setTimeout(() => renderCart(), 320);
      }
    });
  });
}

function handleCheckout() {
  const overlay = document.getElementById('checkout-overlay');
  if (overlay) overlay.classList.add('active');
}

function closeCheckout() {
  const overlay = document.getElementById('checkout-overlay');
  if (overlay) overlay.classList.remove('active');
}

function submitOrder(e) {
  if (e) e.preventDefault();
  const overlay = document.getElementById('checkout-overlay');
  if (overlay) overlay.innerHTML = `
    <div class="checkout-success">
      <div class="success-icon">🎉</div>
      <h2>Order Placed Successfully!</h2>
      <p>Your purchase directly supports rural artisans.</p>
      <p class="text-mid mt-8">You'll receive a confirmation shortly.</p>
      <a href="shop.html" class="btn btn-primary mt-24">Continue Shopping</a>
    </div>`;
  window.GB_CART.clearCart();
}
